from pydantic import BaseModel


class AddModelParams(BaseModel):
    tag: str
    revision: str


class LoadModelParams(BaseModel):
    tag: str


class LoadSchedulerParams(BaseModel):
    scheduler_id: str


class RemoveModelParams(BaseModel):
    tag: str


class Txt2ImgParams:
    prompt: str
    negative_prompt: str
    guidance_scale: int
    num_inference_steps: int
    aspect_ratio: str
    seed: int
    batch_size: int

    def __init__(self, data):
        for key in data:
            setattr(self, key, data[key])
