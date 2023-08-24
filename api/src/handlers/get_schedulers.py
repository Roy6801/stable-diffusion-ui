from fastapi_restful import Resource


class GetSchedulers(Resource):
    def __init__(self, shared_context):
        self.__shared_context = shared_context

    async def get(self):
        try:
            return get_schedulers(self.__shared_context)
        except:
            raise Exception("Get Models Error")


def get_schedulers(shared_context):
    return shared_context["config"]["scheduler"]["models"]
