from flask_restx import fields, Resource, Namespace
from models.pgmodels import PersonelDAO

api = Namespace("resources/personel", description="Personel szczepienny")

personel = api.model("Personel", 
{
    "_id": fields.String(readonly=True, description="Id personelu"),
    "fname": fields.String(description="Imię"),
    "lname": fields.String(description="Nazwisko"),
    "position": fields.String(description="Stanowisko"),
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
    "personel_info": fields.String(description="Informacje o pracowniku"),
})


class PersonelList(Resource):
    """Lista całego personelu"""
    @api.doc("List personels")
    @api.marshal_list_with(personel)
    def get(self):
        """Pobierz cały dostępny personel"""
        return PersonelDAO.get_all()

class PersonelCreate(Resource):
    """ Dodaj personel"""
    @api.doc("create_personel")
    @api.expect(personel)
    @api.marshal_with(personel, code=201)
    def post(self):
        """Dodaj nowy perosnel"""
        return PersonelDAO.create(api.payload)

class Personel(Resource):
    @api.doc("get_personel")
    @api.marshal_with(personel)
    def get(self, id):
        """Pobierz personel"""
        return PersonelDAO.get(id)

    @api.doc("delete_personel")
    @api.response(204, "Personel deleted")
    def delete(self, id):
        """Usuń personel po id_osoba"""
        return PersonelDAO.delete(id)


api.add_resource(Personel, "/<int:id>")
api.add_resource(PersonelCreate, "/create")
api.add_resource(PersonelList, "/all")