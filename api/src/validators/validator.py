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
