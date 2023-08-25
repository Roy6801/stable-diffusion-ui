from fastapi import HTTPException
from fastapi_restful import Resource


class RemoveModel(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, model_id: str):
        try:
            remove_model(self.__shared_context, model_id)
            return model_id
        except Exception as e:
            raise HTTPException(500, str(e))


from src.utils import CONFIG_FILE, MODEL_DIR
import shutil
import json
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


def remove_model(shared_context, model_id: str):
    config = shared_context["config"]
    model_id = model_id.lower().strip()

    if model_id in config["models"]:
        identifier = config["models"][model_id]["identifier"]
        try:
            model_dir = os.path.join(MODEL_DIR, identifier)
            delete_directory(model_dir)
            clean_temp(MODEL_DIR)
        except:
            raise Exception("Failed to clean up Model Files!")

        try:
            del config["models"][model_id]
            with open(CONFIG_FILE, "w") as fw:
                json.dump(config, fw, indent=2)
        except:
            raise Exception("Failed to remove from Config!")
    else:
        raise Exception("Model does Not Exist!")

    return model_id
