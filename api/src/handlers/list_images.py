from fastapi import HTTPException
from fastapi_restful import Resource


class ListImages(Resource):
    async def get(
        self,
        image_dir: str = "txt2img",
        date: str = "",
        desc: bool = False,
        pagination: bool = True,
        limit: int = 2,
        offset: int = 0,
    ):
        try:
            if limit < 0 or offset < 0:
                raise Exception("Invalid Page Requested!")
            images = list_images(image_dir, date, desc)
            if not pagination:
                limit, offset = 0, 0
            return paginate(images, limit, offset)
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils import TXT_2_IMG_DIR
from ..utils.functions import load_txt2img_log
from ..validators import ImageParams
import os

directories = {"txt2img": TXT_2_IMG_DIR}


def paginate(images: dict[str, ImageParams], limit: int, offset: int):
    img_keys: list[str] = list(images)

    if not (limit == 0 and offset == 0):
        start = min(offset, len(images))
        img_keys = img_keys[start : start + limit]

    img_response = {key: ImageParams(**images[key]) for key in img_keys}

    return img_response


def list_images(image_dir: str, date: str, desc: bool):
    dir_path = os.path.join(directories[image_dir], date)

    if not os.path.exists(dir_path):
        raise Exception("Date directory not listed!")

    image_log = load_txt2img_log(dir_path=dir_path)

    if desc:
        image_log = dict(reversed(image_log.items()))

    return image_log
