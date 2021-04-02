import jwt
from flask import request, jsonify, current_app as app
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
from models.models import connect_database_collection
import json
from bson import ObjectId
from models.pgmodels import PatientDAO



def auth_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = None

        if "x-access-tokens" in request.headers:
            token = request.headers["x-access-tokens"]
        
        if not token:
            return {"message": "valid token is missing"}, 401
        
        current_user = None
        try:
            data = jwt.decode(
                token,
                app.config["SECRET_KEY"],
                algorithms="HS256"
            )
            # current_user = db.find_one({"email": data["user"]})
            current_user = PatientDAO().get({"email": data["user"]})
            # del current_user["password"]
        except Exception as e:
            return {"message": str(e)}, 401
        
        return f(current_user, *args, **kwargs)
    
    return decorator

