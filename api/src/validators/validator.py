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


class ImageParams(BaseModel):
    path: str
    index: int
    gen_seed: int
    file_id: str
    file_id_seed: int
    prompt: str
    negative_prompt: str
    guidance_scale: int
    num_inference_steps: int
    aspect_ratio: str
    seed: int
    batch_size: int
    model: str
    revision: str
    scheduler: str
    encoded: str
