from flask import Blueprint
from flask_restx import Api

from apis.patients import api as ns1
from apis.facilities import api as ns2
from apis.doctors import api as ns3
from apis.auth import api as ns4
from apis.vaccine import api as ns5
from apis.clinic import api as ns6
from apis.vaccination import api as ns7

blueprint = Blueprint('api', __name__, url_prefix='/api/v1')
api = Api(blueprint,
    title='My Title',
    version='1.0',
    description='A description',
)

api.add_namespace(ns1)
api.add_namespace(ns2)
api.add_namespace(ns3)
api.add_namespace(ns4)
api.add_namespace(ns5)
api.add_namespace(ns6)
api.add_namespace(ns7)

