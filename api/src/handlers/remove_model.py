from fastapi import HTTPException
from fastapi_restful import Resource
from ..validators import RemoveModelParams


class RemoveModel(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, data: RemoveModelParams):
        try:
            remove_model(self.__shared_context, data.tag)
            return data.tag
        except Exception as e:
            raise HTTPException(500, str(e))


from ..utils.functions import save_config
from ..utils import MODEL_DIR
import shutil
import os


def delete_directory(directory_path):
    try:
        shutil.rmtree(directory_path)
    except Exception as e:
        print(f"An error occurred: {e}")


def clean_temp(directory_path):
    files = os.listdir(directory_path)

    for file_name in files:
        if file_name.startswith("tmp"):
            os.remove(os.path.join(directory_path, file_name))


def remove_model(shared_context, tag: str):
    config = shared_context["config"]
    tag = tag.lower().strip()

    if tag in config["models"]:
        identifier = config["models"][tag]["identifier"]
        try:
            model_dir = os.path.join(MODEL_DIR, identifier)
            delete_directory(model_dir)
            clean_temp(MODEL_DIR)
        except:
            raise Exception("Failed to clean up Model Files!")

        try:
            del config["models"][tag]
            save_config(config)
        except:
            raise Exception("Failed to remove from Config!")
    else:
        raise Exception("Model does Not Exist!")

    return tag
