import os
from loguru import logger
from dotenv import load_dotenv 
from werkzeug.security import generate_password_hash
import psycopg2
from psycopg2.sql import SQL, Identifier, Placeholder
from psycopg2.extras import RealDictCursor
import datetime

load_dotenv()
PG_USER = os.getenv("PG_USER")
PG_PASS = os.getenv("PG_PASS")
PG_HOST = os.getenv("PG_HOST")
PG_NAME = os.getenv("PG_NAME")
PG_PORT = os.getenv("PG_PORT")


def with_connection(f):
    def connect(*args, **kwargs):
        connection = psycopg2.connect(
            host=PG_HOST,
            user=PG_USER,
            password=PG_PASS,
            port=PG_PORT,
            dbname=PG_NAME
        )

        try:

            rv = f(connection, *args, **kwargs)
            logger.info("Połączono")
        except psycopg2.DatabaseError as e:
            logger.error(e)
            connection.rollback()
            raise e

        except Exception as e:
            connection.rollback()
            logger.error(e)
            raise e 
        else:
            connection.commit()
        finally:
            connection.close()
            logger.info("Połącznie zakończone")

        return rv

    return connect

class Database:

    def __init__(self) -> None:
        pass

    @staticmethod
    @with_connection
    def select_rows(connection, query, *args, **kwargs):
        """Wybierz z bazy danych odpowiednie rekordy."""
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, *args)
            records = [dict(row) for row in cursor.fetchall()]
            cursor.close()
            return records 


    @staticmethod
    @with_connection
    def execute_and_return_many(connection, query, *args, **kwargs):
        """Wybierz z bazy danych odpowiednie rekordy."""
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, *args)
            try:
                records = [dict(row) for row in cursor.fetchall()]
            except Exception as e:
                raise e
            cursor.close()
            return records 

    @staticmethod
    @with_connection
    def execute_and_return(connection, query, *args, **kwargs):
        """Wybierz z bazy danych odpowiedni rekord."""
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            cursor.execute(query, *args)
            try:
                record = dict(cursor.fetchone())
            except TypeError as e:
                return None, 500 
            except Exception as e2:
                return {"message": "failure"}, 500
                # raise Exception("Not found") 
            cursor.close()
            return record

    @staticmethod
    @with_connection
    def execute_query(connection, query, *args):
        """Wybierz z bazy danych odpowiedni rekord.
        @query: SQL
        @args: słownik do dodania
        """
        with connection.cursor(cursor_factory=RealDictCursor) as cursor:
            try:
                cursor.execute(query, *args)
            except Exception as e:
                raise e
            cursor.close()
        
    @staticmethod
    @with_connection
    def delete(connection, details, table):
        key = list(details.keys())[0]
        try:
            Database.execute_query(
                SQL("delete from {} where {} = {}")
                .format(Identifier(table), Identifier(key), Placeholder(key)),
                details
            )
        except Exception as e:
            raise e

    @staticmethod
    @with_connection
    def get(connection, details, table):
        key = list(details.keys())[0]
        try:
            return Database.execute_and_return(
                SQL("select * from {} where {} = {}")
                .format(Identifier(table), Identifier(key), Placeholder(key)),
                details
            )
        except Exception as e:
            raise e

    @staticmethod
    @with_connection
    def get_many(connection, details, table):
        key = list(details.keys())[0]
        try:
            return Database.execute_and_return_many(
                SQL("select * from {} where {} = {}")
                .format(Identifier(table), Identifier(key), Placeholder(key)),
                details
            )
        except Exception as e:
            raise e

    @staticmethod
    @with_connection
    def get_all(connection, table):
        try:
            return Database.execute_and_return_many(
                SQL("select * from {}")
                .format(Identifier(table))
                )
        except Exception as e:
            raise e


class PatientDAO(Database):

    def __init__(self) -> None:
        super().__init__()

    @staticmethod
    def get_password(details):
        return Database.get(details, "user_credentials")
    
    @staticmethod
    def get_all():
        return Database.get_all("patients_detailed")

    @staticmethod
    def create(data):
        data["password"] = generate_password_hash(data["password"])
        try:
            result = Database.execute_and_return(
                SQL("""select dodaj_pacjenta as _id from dodaj_pacjenta(
                    imie=>%(fname)s::varchar,
                    nazwisko=>%(lname)s::varchar,
                    data_uro=>%(bdate)s::date,
                    pesel=>%(pesel)s::varchar,
                    haslo=>%(password)s::varchar,
                    miasto=>%(city)s::varchar,
                    telefon=>%(phone)s::varchar,
                    email=>%(email)s::citext,
                    kod_pocztowy=>%(zip)s::varchar,
                    numer=>%(home_number)s::varchar,
                    ulica=>%(street)s::varchar,
                    pacjent_info=>%(patient_info)s::varchar,
                    kontakt_info=>%(contact_info)s::varchar
                );"""),
                data
            )
            return PatientDAO.get(result)
        except:
            return {"message": "internal error"}, 500 

    
    @staticmethod
    def get(details):
        return Database.get(details, "patients_detailed")

    @staticmethod
    def delete(id):
        return Database.delete({"id": id}, "pacjent")


class PersonelDAO:

    def __init__(self) -> None:
        super().__init__()

    @staticmethod
    def get_all():
        return Database.get_all("personel_detailed")

    @staticmethod
    def create(data):
        data["password"] = generate_password_hash(data["password"])
        result = {}
        try:
            result = Database.execute_and_return(
                SQL("""select dodaj_personel as _id from dodaj_personel(
                    imie=>%(fname)s::varchar,
                    nazwisko=>%(lname)s::varchar,
                    pozycja=>%(position)s::pozycja_t,
                    data_uro=>%(bdate)s::date,
                    pesel=>%(pesel)s::varchar,
                    haslo=>%(password)s::varchar,
                    miasto=>%(city)s::varchar,
                    telefon=>%(phone)s::varchar,
                    email=>%(email)s::citext,
                    kod_pocztowy=>%(zip)s::varchar,
                    numer=>%(home_number)s::varchar,
                    ulica=>%(street)s::varchar,
                    personel_info=>%(personel_info)s::varchar,
                    kontakt_info=>%(contact_info)s::varchar
                );"""),
                data
        )
        except Exception as e:
            logger.error(e)
            raise e
        
        return PersonelDAO.get(result)
        
    @staticmethod
    def get(details):
        return Database.get({"_id": details}, "personel_detailed")

    @staticmethod
    def delete(details):
        return Database.delete({"id_osoba": details}, "personel")

class VaccinationDAO:
    status_list = [
        "I tura, oczekuje",
        "II tura, oczekuje",
        "zakończono"
    ]

    @staticmethod
    def get_status(id):
        status_list = VaccinationDAO.status_list
        try:
            status = Database.execute_query(
                SQL("""
                select status from szczepienie 
                where id_pacjent = %(_id)s
                """), {"_id": id})["status"]

            return status
        except:
            return None

    @staticmethod
    def get_new_status(id):
        status = VaccinationDAO.get_status(id)
        status_list = VaccinationDAO.status_list

        if status is not None:
            index = status_list.index(status)
            if index >= len(status_list) - 1:
                raise Exception("Cykl szczepienia już został odbyty!") 

            return {"status": status_list[index+1]}
        else:
            return {"status": status_list[0]}
        

    @staticmethod
    def create(data):
        data = {**data, **VaccinationDAO.get_new_status(data["_id"])}
        print(data)
        return Database.execute_query(
            SQL("""
                insert into szczepienie(
                    data, status, id_pacjent, id_placowka
                    )
                values(
                    %(date)s,
                    %(status)s,
                    %(_id)s,
                    %(facility_id)s
                );"""), data)
        
    @staticmethod 
    def get_vaccination_details(details):
        print(details)
        try:
            return Database.execute_and_return(
                SQL("""
                    select * from vaccinations_detailed 
                    where patient_id = %(_id)s
                """), details
            )
        except:
            return None, 500
        

