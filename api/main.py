from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_restful import Api
from src.utils.functions import verify_config
from src.handlers import *


try:
    config = verify_config()
except:
    raise Exception("Config File could not be loaded!")


shared_context = {
    "pipe": None,
    "tag": "",
    "scheduler": None,
    "scheduler_name": "",
    "scheduler_id": "",
    "device": "cuda",
    "config": config,
}


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


api = Api(app)


# suffix with undercore to avoid conflict with same named modules

add_model_ = AddModel(shared_context)
remove_model_ = RemoveModel(shared_context)
get_models_ = GetModels(shared_context)
get_schedulers_ = GetSchedulers(shared_context)
load_model_ = LoadModel(shared_context)
load_scheduler_ = LoadScheduler(shared_context)
txt2img_ = Txt2Img(shared_context)
get_dates_ = GetDates()
list_images_ = ListImages()
get_image_ = GetImage()


# add resource models to api endpoints

api.add_resource(add_model_, "/add_model")
api.add_resource(remove_model_, "/remove_model")
api.add_resource(get_models_, "/get_models")
api.add_resource(get_schedulers_, "/get_schedulers")
api.add_resource(load_model_, "/load_model")
api.add_resource(load_scheduler_, "/load_scheduler")
api.add_resource(txt2img_, "/txt2img")
api.add_resource(get_dates_, "/get_dates")
api.add_resource(list_images_, "/list_images")
api.add_resource(get_image_, "/get_image")
