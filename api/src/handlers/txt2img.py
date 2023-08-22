from fastapi import Response
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
        except:
            raise Exception("Load Model Error")


from io import BytesIO
from torch import autocast
import base64


def txt2img(
    shared_context,
    prompt: str,
    negative_prompt: str,
    guidance_scale: float = 7.5,
    num_inference_steps: int = 50,
):
    device = shared_context["device"]
    pipe = shared_context["pipe"]

    with autocast(device):
        image = pipe(
            prompt,
            negative_prompt=negative_prompt,
            guidance_scale=guidance_scale,
            num_inference_steps=num_inference_steps,
        ).images[0]

        image.save("testimage.png")
        buffer = BytesIO()
        image.save(buffer, format="PNG")
        imgstr = base64.b64encode(buffer.getvalue())

        return Response(content=imgstr, media_type="image/png")
