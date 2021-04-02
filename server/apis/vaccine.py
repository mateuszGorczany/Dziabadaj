from flask_restx import fields, Resource, Namespace, cors
import pprint
from models.pgmodels import Database, with_connection
from psycopg2.sql import SQL, Placeholder

api = Namespace("resources/vaccines", 
                description="Resource",
                decorators=[cors.crossdomain(origin="*")])

producer = api.model('Producent', 
{
    'id': fields.Integer(readonly=True, description='id producenta'),
    'name': fields.String(description="Nazwa producenta"),
})

vaccine = api.model('Placówka', 
{
    "id": fields.Integer(description="nazwa szczepionki"),
    "name": fields.String(description="nazwa szczepionki"),
    "quantity": fields.Integer(description="ilość fiolek"),
    "size": fields.String(description="rozmiar opakowania"),
    "doses": fields.Integer(description="liczba dawek w 1 fiolce"),
    "weight": fields.Float(description="waga"),
    "id_producer": fields.Integer(description="Id producenta")
  }
)

@api.response(404, 'Producent nieodnaleziony')
class Producer(Resource):
    '''Pokazuje placówkę o danym id'''
    @api.doc('get_facility')
    @api.marshal_with(producer)
    def get(self):
        '''Pobierz producenta'''

        result = None
        try:

            result = Database.execute_and_return_many(
                    SQL("select id, nazwa as name from producent;"))
        except Exception as e:
            return e, 404

        pprint.pprint(result)

        if result is None:
            return "Nie odnaleziono żadnego producenta", 404
        
        return result

class CreateProducer(Resource):
    '''Dodaje producenta'''
    @api.doc('get_producer')
    @api.expect(producer)
    @api.param('name', 'nazwa producenta')
    def post(self):
        '''dodaj producenta'''

        Database.execute_query(
            SQL("""insert into producent(nazwa) values (%(name)s);"""),
            api.payload 
        )


@api.response(404, 'Szczepionka nieodnaleziona')
@api.param('id', 'identyfikator producenta')
class Vaccine(Resource):
    '''Pokazuje szczepionkę o danym id producenta'''
    @api.doc('get_facility')
    @api.marshal_with(vaccine)
    def get(self, id):
        '''Pobierz szczepionkę'''

        result = None
        try:

            result = Database.execute_and_return_many(
                    SQL("""select  
                            id,
                            nazwa as name,
                            liczba_per_box as quantity, 
                            rozmiar as size, 
                            dawki as doses,
                            waga as weight,
                            id_producent as id_producer
                    from szczepionka
                    where id_producent = %s;
                    """),
                    (id,))
        except Exception as e:
            return e, 404

        pprint.pprint(result)

        if result is None:
            return "Nie odnaleziono żadnej szczepionki", 404
        
        return result

class CreateVaccine(Resource):
    '''Dodaje szczepionkę o danym id producenta'''
    @api.doc('put vaccine')
    @api.expect(vaccine)
    def post(self):
        '''dodaj szczepionkę'''

        Database.execute_query(
                    SQL("""insert into szczepionka(
                            nazwa,
                            liczba_per_box, 
                            rozmiar, 
                            dawki,
                            waga,
                            id_producent
                            )
                        values
                        (
                            %(name)s,
                            %(quantity)s,
                            %(size)s,
                            %(doses)s,
                            %(weight)s,
                            %(id_producer)s
                        )
                    ;"""),
                   api.payload 
                )


api.add_resource(Producer, "/producer/all")
api.add_resource(CreateProducer, "/producer/create")
api.add_resource(Vaccine, "/<id>")
api.add_resource(CreateVaccine, "/create")