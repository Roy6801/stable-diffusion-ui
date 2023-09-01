from fastapi import HTTPException
from fastapi_restful import Resource
from ..validators import LoadSchedulerParams


class LoadScheduler(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def post(self, data: LoadSchedulerParams):
        try:
            load_scheduler(self.__shared_context, data.scheduler_id)
            return self.__shared_context["scheduler_name"]
        except Exception as e:
            raise HTTPException(500, str(e))


import diffusers


def load_scheduler(shared_context: dict, scheduler_id: str = ""):
    scheduler_config = shared_context["config"]["scheduler"]["config"]
    schedulers = shared_context["config"]["scheduler"]["models"]

    scheduler_id = scheduler_id.lower().strip()
    if scheduler_id == "":
        scheduler_id = "ddim"

    scheduler_name = schedulers[scheduler_id]
    scheduler_model = getattr(diffusers, scheduler_name)

    scheduler = scheduler_model.from_config(scheduler_config)
    shared_context["scheduler"] = scheduler
    shared_context["scheduler_name"] = scheduler_name
    shared_context["scheduler_id"] = scheduler_id
