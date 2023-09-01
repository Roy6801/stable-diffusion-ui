from fastapi import HTTPException
from fastapi_restful import Resource


class GetImages(Resource):
    async def get(self, image_dir: str = "txt2img", date: str = "", desc: bool = False):
        try:
            return get_images(image_dir, date, desc)
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils import TXT_2_IMG_LOG
import json

image_logs = {"txt2img": TXT_2_IMG_LOG}


def get_images(image_dir: str, date: str, desc: bool):
    log_path = image_logs[image_dir]

    fr = open(log_path, "r")
    dir_list: dict = json.load(fr)
    fr.close()

    images = dir_list[date]

    if desc:
        images = dict(reversed(images.items()))

    return images
