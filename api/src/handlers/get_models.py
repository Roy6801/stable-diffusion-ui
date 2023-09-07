from fastapi import HTTPException
from fastapi_restful import Resource


class GetModels(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def get(self):
        try:
            return get_models(self.__shared_context)
        except Exception as e:
            raise HTTPException(500, str(e))


def get_models(shared_context):
    models = shared_context["config"]["models"]
    active = shared_context["tag"]
    return {"active": active, "models": models}
