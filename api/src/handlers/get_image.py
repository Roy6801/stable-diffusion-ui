from fastapi import HTTPException
from fastapi_restful import Resource


class GetImage(Resource):
    async def get(self, image_path: str):
        try:
            return get_image(image_path)
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils.functions import get_base64
from PIL import Image
import os


def get_image(image_path: str):
    if not os.path.exists(image_path):
        raise Exception("Image path not listed!")

    enc_img: str

    try:
        with Image.open(image_path) as img:
            enc_img = get_base64(image=img)
    except:
        raise ("Failed to Encode!")

    return {"encoded": enc_img}
