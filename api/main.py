from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_restful import Api
from src.handlers import *
import json


try:
    with open("src/config.json", "r") as fr:
        config = json.load(fr)
except:
    raise Exception("Config File could not be loaded!")


shared_context = {"pipe": None, "device": "cuda", "config": config}

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

api = Api(app)
load_model_ = LoadModel(shared_context)
txt2img_ = Txt2Img(shared_context)


api.add_resource(load_model_, "/load_model")
api.add_resource(txt2img_, "/txt2img")
