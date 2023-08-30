from fastapi import HTTPException
from fastapi_restful import Resource
from ..validators import LoadModelParams


class LoadModel(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, data: LoadModelParams):
        try:
            load_model(self.__shared_context, data.tag)
            return data.tag
        except Exception as e:
            raise HTTPException(500, str(e))


from diffusers import StableDiffusionPipeline
from dotenv import find_dotenv, load_dotenv
from ..utils import CONFIG_FILE, MODEL_DIR
import torch
import json
import os


load_dotenv(find_dotenv())
auth_token = os.getenv("HUGGINGFACE_AUTH_TOKEN")


def load_model(shared_context, tag: str):
    tag = tag.lower().strip()

    config = shared_context["config"]

    if tag in config["models"]:
        device = shared_context["device"]
        scheduler = shared_context["scheduler"]
        revision = config["models"][tag]["revision"]

        revision = revision.lower().strip()

        pipe = StableDiffusionPipeline.from_pretrained(
            tag,
            revision=revision,
            torch_dtype=torch.float16,
            use_auth_token=auth_token,
            cache_dir="models",
            safety_checker=None,
            scheduler=scheduler,
        )

        pipe = pipe.to(device)
        shared_context["pipe"] = pipe
        shared_context["tag"] = tag

        identifier = config["models"][tag]["identifier"]

        if not config["models"][tag]["downloaded"] and os.path.exists(
            os.path.join(MODEL_DIR, identifier)
        ):
            config["models"][tag]["downloaded"] = True
            with open(CONFIG_FILE, "w") as fw:
                json.dump(config, fw, indent=2)

        return tag
    else:
        raise Exception("Model Not Found!")
