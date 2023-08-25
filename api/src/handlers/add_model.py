from fastapi import HTTPException
from fastapi_restful import Resource


class AddModel(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, model_id: str, revision: str = "fp16"):
        try:
            add_model(self.__shared_context, model_id, revision)
            return model_id
        except Exception as e:
            raise HTTPException(500, str(e))


from src.utils import CONFIG_FILE
import json


def model_identifier(model_id: str):
    _id = "--".join(model_id.split("/"))
    identifier = f"models--{_id}"
    return identifier


def add_model(shared_context, model_id: str, revision: str = "fp16"):
    config = shared_context["config"]
    model_id = model_id.lower().strip()
    revision = revision.lower().strip()

    if model_id not in config["models"]:
        identifier = model_identifier(model_id)
        try:
            config["models"][model_id] = {
                "revision": revision,
                "model_name": model_id.split("/")[-1],
                "author": model_id.split("/")[0],
                "identifier": identifier,
                "downloaded": False,
            }
            with open(CONFIG_FILE, "w") as fw:
                json.dump(config, fw, indent=2)
        except:
            raise Exception("Failed to add to Config!")
    else:
        raise Exception("Model Exists!")

    return model_id
