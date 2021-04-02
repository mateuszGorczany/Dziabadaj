from flask_restx import fields, Resource, Namespace, cors
import pprint

from flask_restx.marshalling import marshal_with
from models.pgmodels import Database, with_connection, VaccinationDAO
from utils.utils import auth_required
from psycopg2.sql import SQL, Placeholder

api = Namespace("vaccination", 
                description="Rejestracja szczepienie",
                decorators=[cors.crossdomain(origin="*")])

vacc = api.model("Szczepienie", 
{
    'id': fields.Integer(readonly=True, description='id placówki'),
    'date': fields.Date(description="Data"),
})

vacc_sent = api.model("Szczepienie - szczegóły dla użytkownika", 
{
    "vaccination_id": fields.Integer(description="id szczepienia"),
    "patient_id": fields.Integer(description="id pacjenta"),
    "date": fields.String(description="data szczepienia"),
    "status": fields.String(description="status szczepienia"),
    "name": fields.String(description="nazwa placówki"),
    "phone": fields.String(description="telefon placówki"),
    "city": fields.String(description="miasto placówki"),
    "street": fields.String(description="ulica"),
    "building_number": fields.String(description="numer budynku"),
    "zip": fields.String(description="kod pocztowy"),
    "email": fields.String(description="email")
})

class Vaccination(Resource):

    @auth_required
    @marshal_with(vacc)
    @api.doc("register_vaccination")
    def post(current_user, self):
        """Zarejestruj pacjenta"""
        data = {**api.payload, "_id": current_user["_id"]}
        try:
            return VaccinationDAO.create(data)
        except Exception as e:
            return e, 404

@api.param("id")
class VaccinationHanlder(Resource):
    """Pobiera szczegółowe informacje na temat szczepienia"""
    @auth_required
    @marshal_with(vacc_sent)
    @api.doc("vaccination_getter")
    def get(current_user, self, id):
        print("tu jestem")
        return VaccinationDAO.get_vaccination_details({"_id": current_user["_id"]})

api.add_resource(Vaccination, "/register")
api.add_resource(VaccinationHanlder, "/<id>")