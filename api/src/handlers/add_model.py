from fastapi import HTTPException
from fastapi_restful import Resource
from ..validators import AddModelParams


class AddModel(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, data: AddModelParams):
        try:
            add_model(self.__shared_context, data.tag, data.revision)
            return data.tag
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils.functions import save_config
import json


def model_identifier(tag: str):
    tag = "--".join(tag.split("/"))
    identifier = f"models--{tag}"
    return identifier


def add_model(shared_context, tag: str, revision: str = "fp16"):
    config = shared_context["config"]
    tag = tag.lower().strip()
    revision = revision.lower().strip()

    if tag not in config["models"]:
        identifier = model_identifier(tag)
        try:
            config["models"][tag] = {
                "revision": revision,
                "model_name": tag.split("/")[-1],
                "author": tag.split("/")[0],
                "identifier": identifier,
                "downloaded": False,
            }
            save_config(config)
        except:
            raise Exception("Failed to add to Config!")
    else:
        raise Exception("Model Exists!")

    return tag
