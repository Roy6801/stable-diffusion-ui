from fastapi import HTTPException
from fastapi_restful import Resource


class GetDates(Resource):
    async def get(self, image_dir: str = "txt2img", desc: bool = False):
        try:
            return get_dates(image_dir, desc)
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils import TXT_2_IMG_DIR
import os

directories = {"txt2img": TXT_2_IMG_DIR}


def get_dates(image_dir: str, desc: bool):
    dates = os.listdir(directories[image_dir])

    if desc:
        dates = dates[::-1]

    return dates
