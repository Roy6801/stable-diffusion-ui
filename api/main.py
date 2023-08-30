from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi_restful import Api
from src.handlers import *
from src.utils import CONFIG_FILE
import json


try:
    with open(CONFIG_FILE, "r") as fr:
        config = json.load(fr)
except:
    raise Exception("Config File could not be loaded!")


shared_context = {
    "pipe": None,
    "tag": "",
    "scheduler": None,
    "scheduler_name": "",
    "device": "cuda",
    "config": config,
}

load_scheduler.load_scheduler(shared_context)

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

import time


def async_data_generator():
    for data_item in [
        {"key": "value1"},
        {"key": "value2"},
        {"key": "value3"},
        {"key": "value4"},
        {"key": "value5"},
        {"key": "value6"},
    ]:
        time.sleep(1)
        yield json.dumps(data_item) + "\n"


@app.get("/async_stream")
async def async_stream_response():
    return StreamingResponse(async_data_generator(), media_type="application/json")


api = Api(app)


# suffix with undercore to avoid conflict with same named modules

add_model_ = AddModel(shared_context)
remove_model_ = RemoveModel(shared_context)
get_models_ = GetModels(shared_context)
get_schedulers_ = GetSchedulers(shared_context)
load_model_ = LoadModel(shared_context)
load_scheduler_ = LoadScheduler(shared_context)
txt2img_ = Txt2Img(shared_context)


# add resource models to api endpoints

api.add_resource(add_model_, "/add_model")
api.add_resource(remove_model_, "/remove_model")
api.add_resource(get_models_, "/get_models")
api.add_resource(get_schedulers_, "/get_schedulers")
api.add_resource(load_model_, "/load_model")
api.add_resource(load_scheduler_, "/load_scheduler")
api.add_resource(txt2img_, "/txt2img")
