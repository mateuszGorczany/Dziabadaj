CREATE EXTENSION if not exists citext;
CREATE TYPE pozycja_t
AS ENUM (
'lekarz',
'doktor',
'profesor', 
'pielęgniarka'
);

CREATE TYPE status_t 
AS ENUM (
'I tura, oczekuje', 
'II tura, oczekuje',
'zakończono'
);

create or replace function waliduj_nazwe(nazwa varchar)
returns boolean
as
$$
begin
	return nazwa ~ '^[\w''\-,.][^0-9_!¡?÷?¿\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$';
end;
$$ language plpgsql;

CREATE SEQUENCE public.osoba_id_seq;

CREATE TABLE public.osoba (
                id INTEGER NOT NULL DEFAULT nextval('public.osoba_id_seq'),
                imie VARCHAR NOT NULL,
                nazwisko VARCHAR NOT NULL,
                data_uro DATE NOT NULL check (data_uro > '1900-01-01'),
                pesel VARCHAR NOT NULL unique,
                haslo VARCHAR NOT NULL,
                CONSTRAINT osoba_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.osoba_id_seq OWNED BY public.osoba.id;

CREATE TABLE public.pacjent (
                id INTEGER NOT NULL,
                info VARCHAR,
                CONSTRAINT pacjent_pk PRIMARY KEY (id)
);


CREATE SEQUENCE public.przychodnia_id_seq;

CREATE TABLE public.przychodnia (
                id INTEGER NOT NULL DEFAULT nextval('public.przychodnia_id_seq'),
                nazwa VARCHAR NOT NULL unique,
                info VARCHAR,
                CONSTRAINT przychodnia_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.przychodnia_id_seq OWNED BY public.przychodnia.id;

CREATE SEQUENCE public.producent_id_seq;

CREATE TABLE public.producent (
                id INTEGER NOT NULL DEFAULT nextval('public.producent_id_seq'),
                nazwa VARCHAR NOT NULL unique,
                CONSTRAINT producent_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.producent_id_seq OWNED BY public.producent.id;

CREATE SEQUENCE public.szczepionka_id_seq;

CREATE TABLE public.szczepionka (
                id INTEGER NOT NULL DEFAULT nextval('public.szczepionka_id_seq'),
                nazwa VARCHAR NOT NULL,
                dawki INTEGER NOT NULL,
                rozmiar VARCHAR NOT NULL,
                waga REAL NOT NULL,
                id_producent INTEGER,
                liczba_per_box INTEGER NOT NULL,
                CONSTRAINT szczepionka_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.szczepionka_id_seq OWNED BY public.szczepionka.id;

CREATE SEQUENCE public.placowka_id_seq;

CREATE TABLE public.placowka (
                id INTEGER NOT NULL DEFAULT nextval('public.placowka_id_seq'),
                nazwa VARCHAR NOT NULL,
                id_przychodnia INTEGER NOT NULL,
                info VARCHAR,
                dzienny_limit INTEGER,
                CONSTRAINT placowka_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.placowka_id_seq OWNED BY public.placowka.id;

CREATE TABLE public.monitor_ruchu (
                id_placowka INTEGER NOT NULL,
                data DATE DEFAULT CURRENT_DATE NOT NULL,
                chetni INTEGER DEFAULT 0 NOT NULL,
                CONSTRAINT monitor_ruchu_pk PRIMARY KEY (id_placowka, data)
);


CREATE SEQUENCE public.personel_id_seq;

CREATE TABLE public.personel (
                id INTEGER NOT NULL DEFAULT nextval('public.personel_id_seq'),
                id_osoba INTEGER NOT NULL,
                pozycja pozycja_t NOT NULL,
                info VARCHAR,
                CONSTRAINT personel_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.personel_id_seq OWNED BY public.personel.id;

CREATE SEQUENCE public.szczepienie_id_seq;

CREATE TABLE public.szczepienie (
                id INTEGER NOT NULL DEFAULT nextval('public.szczepienie_id_seq'),
                data DATE NOT NULL check(data >= CURRENT_DATE),
                status status_t NOT NULL,
                id_personel INTEGER,
                id_pacjent INTEGER NOT NULL,
                id_szczepionka INTEGER,
                id_placowka INTEGER,
                CONSTRAINT szczepienie_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.szczepienie_id_seq OWNED BY public.szczepienie.id;

CREATE SEQUENCE public.kontakt_id_seq;

CREATE TABLE public.kontakt (
                id INTEGER NOT NULL DEFAULT nextval('public.kontakt_id_seq'),
                telefon VARCHAR,
                email citext unique,
                info VARCHAR,
                CONSTRAINT kontakt_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.kontakt_id_seq OWNED BY public.kontakt.id;

CREATE TABLE public.kontakt_osoba (
                id_kontakt INTEGER NOT NULL,
                id_osoba INTEGER NOT NULL,
                CONSTRAINT kontakt_osoba_pk PRIMARY KEY (id_kontakt, id_osoba)
);


CREATE TABLE public.kontakt_placowka (
                id_kontakt INTEGER NOT NULL,
                id_placowka INTEGER NOT NULL,
                CONSTRAINT kontakt_placowka_pk PRIMARY KEY (id_kontakt, id_placowka)
);


CREATE SEQUENCE public.adres_id_seq;

CREATE TABLE public.adres (
                id INTEGER NOT NULL DEFAULT nextval('public.adres_id_seq'),
                kraj VARCHAR DEFAULT 'Polska' check(waliduj_nazwe(kraj)),
                miasto VARCHAR NOT NULL check(waliduj_nazwe(miasto)),
                kod_pocztowy VARCHAR NOT NULL check(
                    (kraj='Polska' and kod_pocztowy similar to '\d{2}-\d{3}')
                    or kraj<>'Polska'),
                ulica VARCHAR NOT NULL check(waliduj_nazwe(ulica)),
                numer VARCHAR NOT NULL,
                CONSTRAINT adres_pk PRIMARY KEY (id)
);


ALTER SEQUENCE public.adres_id_seq OWNED BY public.adres.id;

CREATE TABLE public.adres_osoba (
                id_adres INTEGER NOT NULL,
                id_osoba INTEGER NOT NULL,
                CONSTRAINT adres_osoba_pk PRIMARY KEY (id_adres, id_osoba)
);


CREATE TABLE public.adres_placowka (
                id_adres INTEGER NOT NULL,
                id_placowka INTEGER NOT NULL,
                CONSTRAINT adres_placowka_pk PRIMARY KEY (id_adres, id_placowka)
);


ALTER TABLE public.adres_osoba ADD CONSTRAINT osoba_adres_osoba_fk
FOREIGN KEY (id_osoba)
REFERENCES public.osoba (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.kontakt_osoba ADD CONSTRAINT osoba_kontakt_osoba_fk
FOREIGN KEY (id_osoba)
REFERENCES public.osoba (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.personel ADD CONSTRAINT osoba_personel_fk
FOREIGN KEY (id_osoba)
REFERENCES public.osoba (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.pacjent ADD CONSTRAINT osoba_pacjent_fk
FOREIGN KEY (id)
REFERENCES public.osoba (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.szczepienie ADD CONSTRAINT pacjent_szczepienie_fk
FOREIGN KEY (id_pacjent)
REFERENCES public.pacjent (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.placowka ADD CONSTRAINT przychodnia_placowka_fk
FOREIGN KEY (id_przychodnia)
REFERENCES public.przychodnia (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.szczepionka ADD CONSTRAINT producent_szczepionka_fk
FOREIGN KEY (id_producent)
REFERENCES public.producent (id)
ON DELETE SET NULL
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.szczepienie ADD CONSTRAINT szczepionka_szczepienie_fk
FOREIGN KEY (id_szczepionka)
REFERENCES public.szczepionka (id)
ON DELETE SET NULL
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.adres_placowka ADD CONSTRAINT placowka_adres_placowka_fk
FOREIGN KEY (id_placowka)
REFERENCES public.placowka (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.kontakt_placowka ADD CONSTRAINT placowka_kontakt_placowka_fk
FOREIGN KEY (id_placowka)
REFERENCES public.placowka (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.szczepienie ADD CONSTRAINT placowka_szczepienie_fk
FOREIGN KEY (id_placowka)
REFERENCES public.placowka (id)
ON DELETE SET NULL
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.monitor_ruchu ADD CONSTRAINT placowka_straznik_ruchu_fk
FOREIGN KEY (id_placowka)
REFERENCES public.placowka (id)
ON DELETE NO ACTION
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.szczepienie ADD CONSTRAINT personel_szczepienie_fk
FOREIGN KEY (id_personel)
REFERENCES public.personel (id)
ON DELETE SET NULL
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.kontakt_placowka ADD CONSTRAINT kontakt_kontakt_placowka_fk
FOREIGN KEY (id_kontakt)
REFERENCES public.kontakt (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.kontakt_osoba ADD CONSTRAINT kontakt_kontakt_osoba_fk
FOREIGN KEY (id_kontakt)
REFERENCES public.kontakt (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.adres_placowka ADD CONSTRAINT adres_adres_placowka_fk
FOREIGN KEY (id_adres)
REFERENCES public.adres (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;

ALTER TABLE public.adres_osoba ADD CONSTRAINT adres_adres_osoba_fk
FOREIGN KEY (id_adres)
REFERENCES public.adres (id)
ON DELETE CASCADE
ON UPDATE NO ACTION
NOT DEFERRABLE;


---- funkcje itp

drop function if exists dodaj_osobe;
create or replace function dodaj_osobe(
	imie varchar,
	nazwisko varchar,
	data_uro date,
	pesel varchar,
	haslo varchar,
	miasto varchar,
	kod_pocztowy varchar,
	ulica varchar,
	numer varchar,
	telefon varchar,
	email varchar,
    kraj varchar default 'Polska',
	kontakt_info varchar default null
)
returns integer as 
$Body$
declare
osoba integer;
adres integer;
kontakt integer;
begin
	with ins1 as (
		insert into osoba(imie, nazwisko, data_uro, pesel, haslo)
		values (imie, nazwisko, data_uro, pesel, haslo)
		returning id as id_osoba
	)
	select id_osoba into osoba from ins1;
	
	with ins2 as (
		insert into kontakt(telefon, email, info)
		values (telefon, email, kontakt_info)
		returning id as id_kontakt
	)
	select id_kontakt into kontakt from ins2;

	with ins3 as (
		insert into adres(kraj, miasto, kod_pocztowy, ulica, numer)
		values (kraj, miasto, kod_pocztowy, ulica, numer)
		returning id as id_adres
	)
	select id_adres into adres from ins3;

	
	insert into kontakt_osoba(id_kontakt, id_osoba)
	values (
		kontakt, 
		osoba
	);
	
	insert into adres_osoba(id_adres, id_osoba) 
	values (
		adres, 
		osoba
	);
	
	
	return osoba as id_osoba;
end;
$Body$ language plpgsql;


create or replace function dodaj_pacjenta(
	imie varchar,
	nazwisko varchar,
	data_uro date,
	pesel varchar,
	haslo varchar,
	miasto varchar,
	kod_pocztowy varchar,
	ulica varchar,
	numer varchar,
	telefon varchar,
	email varchar,
    kraj varchar default 'Polska',
	kontakt_info varchar default null,
	pacjent_info varchar default null
)
returns integer as 
$Body$
declare pacjent integer;
begin
    
    with ins as (
        insert into pacjent(id, info)
        values(
            (select * from dodaj_osobe(
                imie,
	            nazwisko,
    	        data_uro,
	            pesel,
	            haslo,
    	        miasto,
	            kod_pocztowy,
	            ulica,
	            numer,
	            telefon,
	            email,
                kraj,
	            kontakt_info
	        )),
	        pacjent_info
        )
        returning id as id_pacjent
    )
    select id_pacjent into pacjent from ins;
    
    return pacjent;
end;
$Body$ language plpgsql;


create or replace function dodaj_personel(
    pozycja pozycja_t,
	imie varchar,
	nazwisko varchar,
	data_uro date,
	pesel varchar,
	haslo varchar,
	miasto varchar,
	kod_pocztowy varchar,
	ulica varchar,
	numer varchar,
	telefon varchar,
	email varchar,
    kraj varchar default 'Polska',
	kontakt_info varchar default null,
	personel_info varchar default null
)
returns integer as 
$Body$
declare personel integer;
begin
    
    with ins as (
        insert into personel(id_osoba, info, pozycja)
        values(
            (select * from dodaj_osobe(
                imie,
	            nazwisko,
    	        data_uro,
	            pesel,
	            haslo,
    	        miasto,
	            kod_pocztowy,
	            ulica,
	            numer,
	            telefon,
	            email,
                kraj,
	            kontakt_info
	        )),
	        personel_info,
	        pozycja
        )
        returning id as id_personel
    )
    select id_personel into personel from ins;
    
    return personel;
end;
$Body$ language plpgsql;


--- pobieranie id przychodni
select id from przychodnia where nazwa = 'Luxmed';

-- insert placowka

create or replace function dodaj_placowke(
	nazwa varchar,
	dzienny_limit integer,
	id_przychodnia integer,
	miasto varchar,
	kod_pocztowy varchar,
	ulica varchar,
	numer varchar,
	telefon varchar,
	email varchar default null,
	kontakt_info varchar default null,
	placowka_info varchar default null,
	kraj varchar default 'Polska'
)
returns integer as 
$Body$
declare
placowka integer;
adres integer;
kontakt integer;
begin
	with ins1 as 
	(
 		insert into placowka(nazwa, id_przychodnia, dzienny_limit, info)
 		values (nazwa, id_przychodnia, dzienny_limit, placowka_info)
		returning id as id_placowka
	)
	select id_placowka into placowka from ins1;
	
	with ins2 as 
	(
		insert into kontakt(telefon, email, info)
		values (telefon, email, kontakt_info)
		returning id as id_kontakt
	)
	select id_kontakt into kontakt from ins2;

	with ins3 as 
	(
		insert into adres(kraj, miasto, kod_pocztowy, ulica, numer)
		values (kraj, miasto, kod_pocztowy, ulica, numer)
		returning id as id_adres
	)
	select id_adres into adres from ins3;

	
	insert into kontakt_placowka(id_kontakt, id_placowka)
	values (
		kontakt, 
		placowka
	);
	
	insert into adres_placowka(id_adres, id_placowka) 
	values (
		adres, 
		placowka
	);
	
	
	return placowka as id_placowka;
end;
$Body$ language plpgsql;


create or replace view informacje_osob
as
select 
	osoba.id as id_osoba,
	imie,
	nazwisko,
	data_uro,
	pesel,
	kraj,
	miasto,
	kod_pocztowy,
	ulica,
	numer,
	telefon,
	email,
	info as kontakt_info
from osoba
join adres_osoba ao on ao.id_osoba = osoba.id
join adres on adres.id = ao.id_adres
join kontakt_osoba ko on ko.id_osoba = osoba.id
join kontakt k on k.id = ko.id_kontakt;


create or replace view informacje_pacjentow
as
select id_osoba, imie, nazwisko, data_uro, pesel, 
       kraj, miasto, kod_pocztowy, ulica, numer, 
	   telefon, email, kontakt_info, 
	   p.info pacjent_info       
from informacje_osob
join pacjent p on p.id = informacje_osob.id_osoba;


-- szczegółowe dane pacjentów po angielsku (do api)
drop view if exists patients_detailed;
create or replace view patients_detailed
as
select 
	id_osoba as _id,
	imie as fname,
	nazwisko as lname,
	data_uro as bdate,
	pesel,
	kraj as country,
	miasto as city,
	kod_pocztowy as zip,
	ulica as street,
	numer as home_number,
	telefon as phone,
	email,
	pacjent_info as patient_info,
	kontakt_info as contact_info
from informacje_pacjentow;


drop view if exists personel_detailed;
create or replace view personel_detailed
as
select 
	io.id_osoba as _id,
	imie as fname,
	nazwisko as lname,
	pozycja as position,
	p.info as personel_info,
	data_uro as bdate,
	pesel,
	kraj as country,
	miasto as city,
	kod_pocztowy as zip,
	ulica as street,
	numer as home_number,
	telefon as phone,
	email,
	kontakt_info as contact_info
from informacje_osob io
join personel p on p.id_osoba = io.id_osoba;

-- pozyskiwanie danych do logowania
create view user_credentials
as 
select osoba.id _id, email, haslo as password from osoba
join kontakt_osoba ok on ok.id_osoba = osoba.id
join kontakt k on k.id = ok.id_kontakt;

-- kolejny:

create or replace view placowka_informacje
as
select
    placowka.id as id, 
	placowka.nazwa as placowka_nazwa,
	placowka.info as placowka_info,
	kraj,
	miasto,
	kod_pocztowy,
	ulica,
	numer,
	telefon,
	email,
	dzienny_limit,
	k.info as kontakt_info,
	prz.nazwa as przychodnia_nazwa,
	prz.info as przychodnia_info
from placowka
join przychodnia prz on prz.id = placowka.id_przychodnia
join adres_placowka ap on ap.id_placowka = placowka.id
join adres on adres.id = ap.id_adres
join kontakt_placowka kp on kp.id_placowka = placowka.id
join kontakt k on k.id = kp.id_kontakt;


create or replace view facilities_detailed
as
select
    id, 
	placowka_nazwa as name,
	placowka_info as facility_info,
	dzienny_limit as daily_limit,
	kraj country,
	miasto city,
	kod_pocztowy zip,
	ulica street,
	numer "building_number",
	telefon phone,
	email,
	kontakt_info as contact_info,
    przychodnia_nazwa as clinic_name,
	przychodnia_info as clinic_info
from placowka_informacje;


drop function if exists deletor;
create or replace function deletor(table_name regclass, del_id integer)
returns void
as $$
begin
	execute format('delete from %s where id = %s', table_name, del_id);
end;
$$ language plpgsql;



create or replace function usuwacz_informacji_o_osobie()
returns trigger
as $$
begin
    with del as(
        select id_adres from adres_osoba ao
        where old.id = ao.id_osoba
        )
	delete from adres where id = (select id_adres from del);
	
    with del2 as(
        select id_kontakt from kontakt_osoba ko
        where old.id = ko.id_osoba
        )
	delete from kontakt where id = (select id_kontakt from del2);

	return old;
end;
$$ language plpgsql;

drop trigger if exists  manager_usuwania_osob on osoba;
create trigger manager_usuwania_osob
	before delete on osoba
	for each row execute procedure usuwacz_informacji_o_osobie();
	
	
	
create or replace function usuwacz_informacji_o_placowce()
returns trigger
as $$
begin
    with del as(
        select id_adres from adres_placowka ap
        where old.id = ap.id_placowka
        )
	delete from adres where id = (select id_adres from del);
	
    with del2 as(
        select id_kontakt from kontakt_placowka kp
        where old.id = kp.id_placowka
        )
	delete from kontakt where id = (select id_kontakt from del2);

	return old;
end;
$$ language plpgsql;

drop trigger if exists  manager_usuwania_placowek on placowka;
create trigger manager_usuwania_placowek
	before delete on placowka
	for each row execute procedure usuwacz_informacji_o_placowce();


create or replace function usuwacz_personelu()
returns trigger
as $$
begin
	delete from osoba where id = old.id_osoba;
	return old;
end;
$$ language plpgsql;

drop trigger if exists  manager_usuwania_personelu on personel;
create trigger manager_usuwania_personelu
	after delete on personel
	for each row execute procedure usuwacz_personelu();
	

create or replace function usuwacz_pacjentow()
returns trigger
as $$
begin
	delete from osoba where id = old.id;
	return old;
end;
$$ language plpgsql;

drop trigger if exists  manager_usuwania_pacjentow on pacjent;
create trigger manager_usuwania_pacjentow
	after delete on pacjent
	for each row execute procedure usuwacz_pacjentow();
	

create or replace function obsluz_szczepienie()
returns trigger
as $$
begin
    if TG_OP = 'INSERT' or TG_OP = 'UPDATE' then
        if not exists (select from monitor_ruchu where id_placowka = new.id_placowka) then
            insert into monitor_ruchu(data, id_placowka) values (CURRENT_DATE, new.id_placowka);
        end if; 
        update monitor_ruchu 
        set chetni = chetni + 1
        where id_placowka = new.id_placowka;
    end if;
    
    if TG_OP = 'DELETE' or TG_OP = 'UPDATE' then
        update monitor_ruchu 
        set chetni = chetni - 1
        where id_placowka = old.id_placowka;
    
        return old;    
    end if;

    if TG_OP = 'DELETE' then
        return old;
    else 
        return new;
    end if;
end;
$$ language plpgsql;

drop trigger if exists  obslugiwacz_szczepien on szczepienie;
create trigger obslugiwacz_szczepien
	before insert or update on szczepienie
	for each row execute procedure obsluz_szczepienie();

drop trigger if exists  obslugiwacz_usuwania_szczepien on szczepienie;
create trigger oblugiwacz_usuwania_szczepien
	after delete on szczepienie
	for each row execute procedure obsluz_szczepienie();
	

create or replace function obsluz_monitor()
returns trigger
as $$
begin
    if TG_OP = 'UPDATE' and new.chetni > (select dzienny_limit from placowka where id = new.id_placowka) then
        raise exception 'Niepowodzenie operacji. Dzienny limit pacjentów został osiągnięty.';
    end if;

    return new;
end;
$$ language plpgsql;


drop trigger if exists  obslugiwacz_monitora on monitor_ruchu;
create trigger obslugiwacz_monitora
	before update on szczepienie
	for each row execute procedure obsluz_monitor();


create or replace function waliduj_osobe()
returns trigger
language plpgsql
as $$
begin
	if not waliduj_nazwe(new.imie) then
		raise exception 'Imię zawiera niedozwolone znaki(s).';
	elsif not waliduj_nazwe(new.nazwisko) then
		raise exception 'Nazwisko zawiera niedozwolone znaki(s).';
	end if;

return NEW;
end;
$$;

drop trigger if exists  walidator_osoby on osoba;
create trigger walidator_osoby
	after insert or update on osoba
	for each row execute procedure waliduj_osobe();
	
comment on column szczepionka.waga is 'kg';

drop view if exists vaccinations_detailed;
create view vaccinations_detailed
as
select 
sz.id as vaccination_id,
id_pacjent as patient_id,
data as date,
status,
name,
phone,
city,
street,
building_number,
zip,
email
from szczepienie sz
join facilities_detailed fd on fd.id = sz.id_placowka; 

create or replace view applicants_per_city_by_day
as
select data date, miasto city, sum(chetni) applicants from monitor_ruchu mr
join placowka p on p.id = mr.id_placowka
join adres_placowka ap on ap.id_placowka = p.id
join adres a on a.id = ap.id_adres
group by data, miasto
having sum(chetni) > 1;


create or replace view applicants_per_origin
as
select data date, miasto city, count(distinct id_pacjent) applicants from szczepienie sz
join osoba o on o.id = sz.id_pacjent
join adres_osoba ao on ao.id_osoba = o.id
join adres a on a.id = ao.id_adres
group by data, miasto;
