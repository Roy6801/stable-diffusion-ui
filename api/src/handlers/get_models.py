from fastapi_restful import Resource


class GetModels(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def get(self):
        try:
            return get_models(self.__shared_context)
        except:
            raise Exception("Get Models Error")


def get_models(shared_context):
    return shared_context["config"]["models"]
