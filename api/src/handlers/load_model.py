from fastapi_restful import Resource


class LoadModel(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, model_id: str, revision: str = "fp16"):
        try:
            load_model(self.__shared_context, model_id, revision)
            return model_id
        except:
            raise Exception("Load Model Error")


from diffusers import StableDiffusionPipeline
from dotenv import find_dotenv, load_dotenv
import torch
import os


load_dotenv(find_dotenv())
auth_token = os.getenv("HUGGINGFACE_AUTH_TOKEN")


def load_model(shared_context, model_id: str, revision: str = "fp16"):
    device = shared_context["device"]

    pipe = StableDiffusionPipeline.from_pretrained(
        model_id,
        revision=revision,
        torch_dtype=torch.float16,
        use_auth_token=auth_token,
        cache_dir="models",
        safety_checker=None,
    )
    pipe = pipe.to(device)

    shared_context["pipe"] = pipe

    return model_id
