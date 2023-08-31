from fastapi import HTTPException
from fastapi_restful import Resource


class GetDates(Resource):
    async def get(self, image_dir: str = "txt2img"):
        try:
            return get_dates(image_dir)
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils import TXT_2_IMG_LOG
import json

image_logs = {"txt2img": TXT_2_IMG_LOG}


def get_dates(image_dir: str):
    log_path = image_logs[image_dir]

    fr = open(log_path, "r")
    dir_list: dict = json.load(fr)
    fr.close()

    return dir_list.keys()
