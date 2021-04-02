import React, { useEffect, useState } from "react"
import { sender, fetcher, getToken} from "../../utils/utils"
import {
    Container,
    CssBaseline,
    Button, 
    TextField, 
    Grid, 
    Paper, 
    Typography, 
    makeStyles
} from "@material-ui/core";
import { Formik, Field, Form, useField } from "formik"
import { styles } from "../styles"
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import hash from "object-hash"
import * as yup from "yup"
import { API } from "../../App"
import { MyTextField } from "../Form"
import SimpleCard from "../FacilityCard"
import VaccinationCard from "../VaccinationCard"


const schema = yup.object({
    date: yup.date("Niepoprawny format daty").required("Data urodzenia jest wymagana"),
})


export function FormVaccinate({loginSetter})
{
    const [data, setData] = useState([])
    const [Id, setId] = useState(null)
    const [vacc, setVacc] = useState(null)
    const classes = makeStyles(styles.myMakeStyles);

    const URL = "resources/facilites/all"
    const [facilities, setFacilities] = useState(null)
    useEffect(() =>
    {
        fetcher(API + URL, setFacilities, {
            method: "GET"
        })
    }, [])

    useEffect(async () =>
    {
        const response = await fetch(
        API + "vaccination/current", 
        {
            method: "GET",
            headers:
            {
                "Content-Type": "application/json",
                "x-access-tokens": getToken()
            }
        })

        const json = await response.json()
        if (response.status != 200)
        {
            setVacc(null)
            return
        }
        setVacc(json)
    }, [])

    console.log(vacc)
    console.log("vacc = ?", vacc===null)
    console.log(facilities)
    return (
        <div>
        <Container component="main" maxWidth="xs">
            <CssBaseline> 
        <Grid>
        {!!vacc && <VaccinationCard key={vacc.id}
            data={vacc}
            />
        }
         {!vacc && <Paper style={styles.glassMorphism}>

        <div >
            <LocalHospitalIcon className={classes.avatar}>
                
            </LocalHospitalIcon>
        </div>
        <Typography component="h1" variant="h5">
            Zarejestruj się na szczepienie
        </Typography>
         <Formik
            validationSchema={schema}
            initialValues={
                {
                    date: ""
                }}
            onSubmit={async (data, { setSubmitting, resetForm }) =>
            {
                setSubmitting(true);
                data = {...data, facility_id: Id}
                console.log(data);
                setSubmitting(false);
                const response = await fetch(
                    API + "vaccination/register", 
                    {
                        method: "POST",
                        headers:
                        {
                            "Content-Type": "application/json",
                            "x-access-tokens": getToken()
                        },
                        body: JSON.stringify(data),
                })
            
                const json = await response.json()
                
                if (response.status === 200)
                    location.reload()
                if (response.status === 401)
                    alert("Użytkownik niezalogowany")
                if (response.status != 200)
                    alert("Niepowodzenie")
                console.log(json)
            }
        }
        >
        {({
            values,
            isSubmitting,
            errors,
            touched
        }) => 
        (
            <Form>
                
                <Field 
                    name="date" 
                    placeholder="2020-01-01" 
                    type="input" 
                    label="data" 
                    as={MyTextField}
                />
                <Button disabled={isSubmitting} type="submit">Prześlij zgłoszenie</Button>
            </Form>
        )}
        </Formik>
        Wybrano: { facilities && Id && facilities.find( ({ id }) => id === Id ).name}
        </Paper>
        }
        {!vacc && facilities && facilities.map((item,key)=>{
            return <SimpleCard key={item.id}
            data={item}
            idSetter={setId}
            />
        })}
        
        </Grid>
           </CssBaseline>                
        </Container>
    </div>
    );
    }