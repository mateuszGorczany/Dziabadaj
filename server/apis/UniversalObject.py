from flask import request

class DataHolder():
    def __init__(self, api, DAO) -> None:
        self.DAO = DAO
        self.api = api

class ObjectList(DataHolder):
    def get(self, params={}):
        return self.DAO.get_many(params)


class Object(DataHolder):

    def get(self, id):
        return self.DAO.get(id)

    def delete(self, id):
        self.DAO.delete(id)
        return '', 204

    def put(self, id):
        return self.DAO.update(id, self.api.payload)

    def post(self):
        result = None
        try:
            result = self.DAO.create(self.api.payload)
        except Exception as e:
            return e, 409
        
        return result, 201
        # pass

    def patch(self, id):
        return self.DAO.update(id, self.api.payload)