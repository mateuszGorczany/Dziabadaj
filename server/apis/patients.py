from flask_restx import fields, Resource, Namespace, cors
from models.pgmodels import PatientDAO
from utils.utils import auth_required
import pprint

api = Namespace("resources/patients", 
                description="Obługa pacjenta",
                decorators=[cors.crossdomain(origin="*")])

patient = api.model("Patient", 
{
    "_id": fields.String(readonly=True, description="The patient unique identifier"),
    "fname": fields.String(description="Imię"),
    "lname": fields.String(description="Nazwisko"),
    "bdate": fields.Date(description="Data urodzenia"),
    "pesel": fields.String(description="Pesel"),
    "email": fields.String(description="Email"),
    "phone": fields.String(description="Nr telefonu"),
    "country": fields.String(description="Kraj zamieszkania"),
    "city": fields.String(description="Miejsce zamieszkania"),
    "street": fields.String(description="ulica"),
    "home_number": fields.String(description="numer domu"),
    "zip": fields.String(description="Kod pocztowy"),
    "contact_info": fields.String(description="Informacje kontaktowe"),
    "patient_info": fields.String(default=None, description="Informacje o chorobach pacjenta"),
})


def is_whole_object(dictionary, expected_keys):
    for key in expected_keys:

        if key not in dictionary.keys():
            return False
            
    return True

class PatientList(Resource):
    """Shows a list of all todos, and lets you POST to add new tasks"""
    def __init__(self, api, *args, **kwargs):
        super().__init__(api=api, *args, **kwargs)
        self.patient = PatientDAO()

    @api.doc("List patients")
    @api.marshal_list_with(patient)
    def get(self):
        """List all patients"""
        return PatientDAO.get_all()

class PatientCreate(Resource):
    """Stwórz nowego pacjenta"""

    @api.doc("create_patient")
    @api.expect(patient)
    @api.marshal_with(patient, code=201)
    def post(self):
        """Stwórz nowego pacjenta"""
        pprint.pprint(api.payload)
        api.payload["patient_info"]=None
        api.payload["contact_info"]=None
        return PatientDAO.create(api.payload)

@api.response(404, "Patient not found")
@api.param("id", "The task identifier")
class Patient(Resource):

    """Możliwośc pobrania pacjenta oraz jego usunięcia"""
    @auth_required
    @api.doc("get_patient")
    @api.marshal_with(patient)
    def get(current_user, self, id):
        """Pobierz pacjenta"""
        pprint.pprint(current_user)
        return current_user

    @api.doc("delete_patient")
    @api.response(204, "Patient deleted")
    def delete(self, id):
        """Usuń pacjenta"""
        return PatientDAO.delete(id)


api.add_resource(Patient, "/<id>")
api.add_resource(PatientCreate, "/create")
api.add_resource(PatientList, "/all")
