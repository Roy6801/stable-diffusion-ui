from fastapi import WebSocket, WebSocketException, HTTPException
from fastapi_restful import Resource
from pydantic import BaseModel
import json


class Txt2ImgParams(BaseModel):
    prompt: str
    negative_prompt: str
    guidance_scale: int
    num_inference_steps: int
    aspect_ratio: str
    seed: int
    batch_size: int


class Txt2Img(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, websocket: WebSocket):
        try:
            await websocket.accept()
            data: Txt2ImgParams = json.loads(await websocket.receive_text())

            tag = await txt2img(
                self.__shared_context,
                websocket,
                data.prompt,
                data.negative_prompt,
                data.guidance_scale,
                data.num_inference_steps,
                data.aspect_ratio,
                data.seed,
                data.batch_size,
            )
            return tag
        except WebSocketException as wse:
            await websocket.close(code=wse.code)
        except Exception as e:
            raise HTTPException(500, str(e))


import torch
from torch import autocast
from src.utils import TXT_2_IMG_DIR
from io import BytesIO
import base64
from datetime import datetime
import time
import os

dimensions = {
    "1:1": [512, 512],
    "3:2": [768, 512],
    "2:3": [512, 768],
}


def get_base64(image):
    buffer = BytesIO()
    image.save(buffer, format="PNG")
    return base64.b64encode(buffer.getvalue())


def txt2img(
    shared_context,
    websocket,
    prompt: str,
    negative_prompt: str,
    guidance_scale: int = 7,
    num_inference_steps: int = 50,
    aspect_ratio: str = "1:1",
    seed: int = 0,
    batch_size: int = 1,
):
    device = shared_context["device"]
    pipe = shared_context["pipe"]

    prompt = prompt.strip()
    negative_prompt = negative_prompt.strip()
    aspect_ratio = aspect_ratio.strip()

    width, height = dimensions[aspect_ratio]

    generator = [
        torch.Generator(device="cuda").manual_seed(seed) for _ in range(batch_size)
    ]

    prompt = [prompt for _ in range(batch_size)]
    negative_prompt = [negative_prompt for _ in range(batch_size)]

    async def latents_callback(step, timestep, latents):
        with torch.no_grad():
            print(step, timestep)

            latents = 1 / 0.18215 * latents
            images = pipe.vae.decode(latents).sample

            images = (images / 2 + 0.5).clamp(0, 1)

            # we always cast to float32 as this does not cause significant overhead and is compatible with floa16
            images = images.cpu().permute(0, 2, 3, 1).float().numpy()

            # convert to PIL Images
            images = pipe.numpy_to_pil(images)

            # do something with the Images
            for image in images:
                b64_img = get_base64(image)
                await websocket.send_text(b64_img)

    with autocast(device):
        results = pipe(
            prompt,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps,
            width=width,
            height=height,
            generator=generator,
            callback=latents_callback,
            callback_steps=5,
        ).images

        images = []

        dir_name = datetime.today().strftime("%d-%m-%Y")

        for ind, image in enumerate(results):
            file_name = f"{int(time.time())}_{seed}_{ind}.png"
            file_path = os.path.join(TXT_2_IMG_DIR, dir_name, file_name)
            image.save(file_path)
            imgstr = get_base64(image)
            images.append(imgstr)

        return images
