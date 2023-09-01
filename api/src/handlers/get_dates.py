from fastapi import HTTPException
from fastapi_restful import Resource


class GetDates(Resource):
    async def get(self, image_dir: str = "txt2img", desc: bool = False):
        try:
            return get_dates(image_dir, desc)
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils.functions import load_txt2img_log, save_txt2img_log

functions = {"txt2img": [load_txt2img_log, save_txt2img_log]}


def get_dates(image_dir: str, desc: bool):
    loader, saver = functions[image_dir]
    image_log = loader()
    saver(image_log)

    dates = list(image_log.keys())

    if desc:
        dates = dates[::-1]

    return dates
