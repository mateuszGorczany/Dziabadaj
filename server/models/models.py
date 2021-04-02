import environ
from pymongo import MongoClient
from bson import ObjectId
from werkzeug.security import generate_password_hash
from pathlib import Path

base = Path(__file__).parent
ENV_PATH = str((base / "../.env").resolve())

def env():
    envir = environ.Env(

    DEBUG=(bool, False)
    )
    # reading .env file
    environ.Env.read_env(env_file=ENV_PATH)

    MONGO_USER = envir('MONGO_USER')
    MONGO_PASS = envir('MONGO_PASS')
    MONGO_HOST = envir('MONGO_HOST')
    MONGO_NAME = envir('MONGO_NAME')
    MONGO_LINK = envir('MONGO_LINK')
    MONGO_DATABASE_HOST = \
    'mongodb://%s:%s@%s/%s' \
    % (MONGO_USER, MONGO_PASS, MONGO_HOST, MONGO_NAME)

    # return MONGO_DATABASE_HOST
    return MONGO_LINK


def connect_database_collection(collection):
   return MongoClient(env())["dziabadaj"][collection]

db = MongoClient(env())["dziabadaj"]
patients = db.patients
facilities = db.facilities
doctors = db.doctors


def convert_dataId_to_str(data):
    data["_id"] = str(data["_id"])
    return data

def convert_dataId_to_ObjectId_loop(datas):
    for data in datas:
        data["_id"] = ObjectId(data["_id"])
    return datas

def convert_dataId_to_ObjectId(data):
    data["_id"] = ObjectId(data["_id"])
    return data

def convert_str_to_ObjectId(id):
    obj = {}
    obj["_id"] = id 
    return convert_dataId_to_ObjectId(obj)

class UniversalObject(object):

    def __init__(self, db) -> None:
        super().__init__()
        self.db = db

    def get_many(self, params):
        params = convert_dataId_to_ObjectId_loop(params)
        findings = [record for record in self.db.find(params)] 
        for finding in findings:
            finding = convert_dataId_to_str(finding)
        
        return findings

    def get(self, details):
        if "_id" in details.keys():
            details["_id"] = convert_str_to_ObjectId(details["_id"])
        found = self.db.find_one(details)
        return convert_dataId_to_str(found) 


    def create(self, data):
        return self.db.insert_one(data).inserted_id.__str__()

    def update(self, id, data):
        record = {"_id": ObjectId(id)}
        newvalues = { "$set": data }
        self.db.update_one(record, newvalues)

        return self.get(id)

    def delete(self, id):
        obj = self.get(id)
        self.objects.remove(obj)


class PatientsDAO(UniversalObject):
    
    def __init__(self) -> None:
        super().__init__(patients)

    def create(self, data):
        if self.db.find({"email": data["email"]}).count() > 1:
            return {"message": "Konto o takim emailu już istnieje!"}, 200
        data["password"] = generate_password_hash(data["password"])
        super().create(data)
    
    def get(self, id):
        data = super().get(id)
        del data["password"]
        return data


class FacilitiesDAO(UniversalObject):
    
    def __init__(self) -> None:
        super().__init__(facilities)

class DoctorsDAO(UniversalObject):
    
    def __init__(self) -> None:
        super().__init__(doctors)

