
from flask_restx import fields, Resource, Namespace, cors
from models.pgmodels import Database
from .UniversalObject import Object, ObjectList
from psycopg2.sql import SQL, Identifier, Placeholder

api = Namespace("resources/clinics", 
                description="Resource",
                decorators=[cors.crossdomain(origin="*")])

clinic = api.model("Clinic",
{
    "id": fields.Integer(readonly=True, description="Id kliniki"),
    "name": fields.String(description="nazwa kliniki"),
    "info": fields.String(description="nazwa kliniki")
})

class ClinicList(Resource):
    '''Odnajduje wszystkie przychodnie'''
    @api.marshal_with(clinic)
    def get(self):
        '''odnajdź przychodnie'''
        return Database.execute_and_return_many(
            """select id, nazwa as name from przychodnia;"""
        )

class CreateClinic(Resource):
    '''Dodaje przychodnię'''
    @api.doc('create_clinic')
    @api.expect(clinic)
    def post(self):
        '''dodaj przychodnię'''

        result = None
        Database.execute_query(
                    SQL("""insert into przychodnia(
                            nazwa,
                            info
                            )
                        values
                        (
                            %(name)s,
                            %(info)s
                        )
                    ;"""),
                   api.payload 
                )


api.add_resource(CreateClinic, "/create")
api.add_resource(ClinicList, "/all")