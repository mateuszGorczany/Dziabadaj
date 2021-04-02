from models.pgmodels import PatientDAO
from flask import request, current_app as app
from flask.json import jsonify
from flask_restx import fields, Resource, Namespace, cors
from utils.utils import auth_required
import datetime
from models.models import connect_database_collection
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

api = Namespace("auth", 
                description="Authorization and authentication",
                decorators=[cors.crossdomain(origin="*")])


class Login(Resource):

    @staticmethod
    def could_not_verify():
        return "Could not verify!", 401

    def post(self):
        if "password" not in api.payload.keys() or "email" not in api.payload.keys():
            return Login.could_not_verify()

        received_password = api.payload["password"]
        login = api.payload["email"]

        try:
            # stored_hashed_password = connect_database_collection("patients").find_one({"email": login})["password"]
            stored_hashed_password = PatientDAO.get_password({"email": login})["password"]
            print(stored_hashed_password)
            print(received_password)
            isPasswordOk = check_password_hash(stored_hashed_password, received_password)
        except:
            return Login.could_not_verify()

        if isPasswordOk:
            token = jwt.encode(
                {
                    "user": login,
                    "exp": (datetime.datetime.now() + datetime.timedelta(seconds=660)).timestamp()
                },
                app.config["SECRET_KEY"]
            )
            return {"token": token}

        return Login.could_not_verify()

api.add_resource(Login, "/login")
