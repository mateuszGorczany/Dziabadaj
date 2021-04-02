
from flask_restx import fields, Resource, Namespace, cors
from models.pgmodels import Database
from psycopg2.sql import SQL

api = Namespace("resources/facilites", 
                description="Obsługa placówek",
                decorators=[cors.crossdomain(origin="*")])

base_fields = {
    "name": fields.String(description="Nazwa placówki"),
    "daily_limit": fields.Integer(description="Dzienny limit pacjentów placówki do szczepienia"),
    "city": fields.String(description="Miasto placówki"),
    "zip": fields.String(description="kod pocztowy placówki"),
    "street": fields.String(description="ulica placówki"),
    "building_number": fields.String(description="numer budynku placówki"),
    "phone": fields.String(description="Telefon placówki"),
    "email": fields.String(description="Email placówki"),
    "contact_info": fields.String(description="Informacje o kontakcie"),
    "facility_info": fields.String(description="Informacje o placówce"),
    "country": fields.String(description="Kra"),
}

facility = api.model('Facility', 
{
    "id": fields.Integer(readonly=True, description="Id placówki"),
    "clinic_name": fields.String(description="Nazwa przychodni"),
    "clinic_info": fields.String(description="Informacje o przychodni"),
    **base_fields
})

facility_to_sent = api.model('Facility to sent', {**base_fields, "id_clinic": fields.Integer})

class FacilityList(Resource):
    """Odnajduje wszystkie placówki"""
    @api.doc('List facilites')
    @api.marshal_list_with(facility)
    def get(self):
        '''List all facilities'''
        return Database.execute_and_return_many("""select * from facilities_detailed""")


class FacilityCreate(Resource):
    """ hodaj nową przychodnię"""
    @api.doc('create_facility')
    @api.expect(facility_to_sent)
    # @api.marshal_with(facility_to_sent, code=201)
    def post(self):
        """Dodaj placówkę"""

        return Database.execute_query(
                    SQL("""select dodaj_placowke(
                        %(name)s,
                        %(daily_limit)s,
                        %(id_clinic)s,
                        %(city)s,
                        %(zip)s,
                        %(street)s,
                        %(building_number)s,
                        %(phone)s,
                        %(email)s,
                        %(contact_info)s,
                        %(facility_info)s,
                        %(country)s
                        );"""),
                   api.payload 
                )


api.add_resource(FacilityCreate, "/create")
api.add_resource(FacilityList, "/all")


