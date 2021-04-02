import React, { useEffect, useState } from "react"
import { sender, fetcher, handleOffline } from "../../utils/utils"
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

const URL = "resources/patients/create"

const schema = yup.object({
    fname: yup.string().required("Imię jest wymagane"),
    lname: yup.string().required("Nazwisko jest wymagane"),
    bdate: yup.date("Niepoprawny format daty").required("Data urodzenia jest wymagana"),
    pesel: yup.string().required("Pesel jest wymagany"),
    email: yup.string().email("Nieprawidłowy email").required("Email jest wymagany"),
    phone: yup.string().required("Numer telefonu jest wymagany"),
    city: yup.string().required("Miasto/miejscowość jest wymagane"),
    street: yup.string().required("Ulica jest wymagana"),
    home_number: yup.string().required("Numer domu jest wymagany"),
    zip: yup.string().required("Kod pocztowy jest wymagany"),
    password: yup.string()
        .required("Nie wpisano hasła.") 
        .min(8, "Hasło jest zbyt krótkie - powinno mieć conajmniej 8 znaków.")
})


export const MyTextField = ({ ...props }) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
        <TextField
            {...props}
            margin="normal"
            helperText={errorText}
            error={!!errorText}
        />
    )
}

export default function FormDziabadaj({loginSetter})
{
    const [data, setData] = useState([])
    const classes = makeStyles(styles.myMakeStyles);

    return (
        <div>
            <Container component="main" maxWidth="xs">
                <CssBaseline> 
            <Grid>
                <Paper style={styles.glassMorphism}>

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
                        fname: "",
                        lname: "",
                        bdate: "",
                        pesel: "",
                        email: "",
                        phone: "",
                        city: "",
                        street: "",
                        home_number: "",
                        zip: "",
                        password: "",
                        patient_info: null
                    }}
                onSubmit={async (data, { setSubmitting, resetForm }) =>
                {
                    setSubmitting(true);
                    data.password = hash(data.password)
                    console.log(data);
                    setSubmitting(false);
                    const [json, response] = await sender(API + URL, data)

                    if (response === 200)
                        alert("Sukces")
                    else
                        alert("Niepowodzenie")

                    loginSetter(true)
                    setTimeout(() =>
                    {
                        console.log("setting")
                        loginSetter(false)
                    }, 10000)
                    resetForm();
                }}
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
                        name="fname" 
                        placeholder="Jan" 
                        type="input" 
                        label="imię" 
                        as={MyTextField}
                    />
                    <Field 
                        name="lname" 
                        placeholder="Kowalski"
                        type="input"
                        label="nazwisko"
                        as={MyTextField}
                    />
                    <Field 
                        name="bdate" 
                        placeholder="2003-05-13" 
                        type="input" 
                        label="data urodzenia" 
                        as={MyTextField}
                    />
                    <Field 
                        name="pesel" 
                        placeholder="12345679" 
                        type="input" 
                        label="pesel" 
                        as={MyTextField}
                    />
                    <Field 
                        name="email" 
                        placeholder="janKowalski@poczta.com" 
                        type="input" 
                        label="email" 
                        as={MyTextField}
                    />
                    <Field 
                        name="phone" 
                        placeholder="+48 123456789" 
                        type="input" 
                        label="telefon" 
                        as={MyTextField}
                    />
                    <Field 
                        name="city" 
                        placeholder="Kraków" 
                        type="input" 
                        label="miasto/miejscowość" 
                        as={MyTextField}
                    />
                    <Field 
                        name="street" 
                        placeholder="Kwiatowa" 
                        type="input" 
                        label="ulica" 
                        as={MyTextField}
                    />
                    <Field 
                        name="home_number" 
                        placeholder="354" 
                        type="input" 
                        label="number domu" 
                        as={MyTextField}
                     />
                    <Field 
                        name="zip" 
                        placeholder="58-023" 
                        type="input" 
                        label="kod pocztowy" 
                        as={MyTextField}
                    />
                    <Field 
                        name="password" 
                        placeholder="***********" 
                        type="password"  
                        label="hasło" 
                        as={MyTextField}
                    />
                     
                    <Button disabled={isSubmitting} type="submit">Prześlij zgłoszenie</Button>
                </Form>
            )}
            </Formik>
            </Paper>
            </Grid>
               </CssBaseline>                
            </Container>
        </div>
    )
}