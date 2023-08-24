from fastapi import HTTPException
from fastapi_restful import Resource


class Txt2Img(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(
        self,
        prompt: str,
        negative_prompt: str,
        guidance_scale: float = 7.5,
        num_inference_steps: int = 50,
    ):
        try:
            model_id = txt2img(
                self.__shared_context,
                prompt,
                negative_prompt,
                guidance_scale,
                num_inference_steps,
            )
            return model_id
        except Exception as e:
            raise HTTPException(500, str(e))


import torch
from torch import autocast
from io import BytesIO
import base64


def get_base64(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue())


def txt2img(
    shared_context,
    prompt: str,
    negative_prompt: str,
    guidance_scale: float = 7.5,
    num_inference_steps: int = 50,
    seed: int = -1,
):
    device = shared_context["device"]
    pipe = shared_context["pipe"]

    def progress(step, timestep, latents):
        with torch.no_grad():
            latents = 1 / 0.18215 * latents
            images = pipe.vae.decode(latents).sample

            images = (images / 2 + 0.5).clamp(0, 1)

            # we always cast to float32 as this does not cause significant overhead and is compatible with bfloa16
            images = images.cpu().permute(0, 2, 3, 1).float().numpy()

            # convert to PIL Images
            images = pipe.numpy_to_pil(images)

            # do something with the Images
            for image in images:
                get_base64(image)

    with autocast(device):
        results = pipe(
            prompt,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps,
            callback=progress,
            callback_steps=5,
        ).images

        images = []

        for ind, image in enumerate(results):
            image.save(f"testimage{ind}.png")
            imgstr = get_base64(image)
            images.append(imgstr)

        return images
