import React from "react"
import { Grid,Paper, Avatar, Box, Button } from "@material-ui/core"
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import hash from "object-hash"
import * as yup from "yup"
import { Formik, Field, Form, useField } from "formik"
import { MyTextField } from "../Form"
import { styles } from "../styles";
import { isLoggedIn, jwtToCookie, sender, timeToExpire} from "../../utils/utils"
import { useHistory } from "react-router-dom"
import { API } from "../../App"

const schema = yup.object(
{
    email: yup.string().email("Niepoprawny email").required("Email jest wymagany"),
    password: yup.string()
        .required("Nie wpisano hasła.") 
        .min(8, "Hasło jest zbyt krótkie - powinno mieć conajmniej 8 znaków.")
}
)

export const Login = ({loginSetter}) =>
{
    let history = useHistory()
    const paperStyle = {
        padding: 40,
        height: "40vh",
        width: 330,
        margin: "30px auto",
    }
    const avatarStyle={backgroundColor:"#1bbd7e"}
    const btnstyle={margin:"8px 0"}
    return(
        <div>
        <Grid>
                <Paper elevation={10} style={{ ...paperStyle, ...styles.glassMorphism }}>
        <Grid align="center">
                
                <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                     <h2>Zaloguj się</h2>
                </Grid>

                <Formik
                    validationSchema={schema}
                    initialValues={
                        {
                            email: "",
                            password: ""
                        }}
                    onSubmit={async (data, { setSubmitting, resetForm }) =>
                    {
                        setSubmitting(true);
                        data.password = hash(data.password)
                        const [message, status] = await sender(API + "auth/login", data)
                        console.log(message)
                        if (status != 200)
                        {
                            alert(message)
                            return
                        }
                        else 
                            jwtToCookie(message)

                        const isLogged = isLoggedIn()
                        loginSetter(isLogged)
                        if (!isLogged)
                            return

                        history.push("/")
                        setTimeout(() =>
                        {
                            console.log("setting")
                            loginSetter(false)
                        }, timeToExpire())
                        
                        console.log(timeToExpire())
                        console.log(data);
                        setSubmitting(false);
                        resetForm();
                    }}
                >
                {({
                    values,
                    isSubmitting,
                    errors
                }) => 
                (
                    <Form>
                        
                        <Field 
                            name="email" 
                            placeholder="janKowalski@poczta.com" 
                            type="input" 
                            label="email" 
                            margin="normal"
                            as={MyTextField}
                        />
                        <Field 
                            name="password" 
                            placeholder="***********" 
                            type="password"  
                            label="hasło" 
                            margin="normal"
                            as={MyTextField}
                        />
                        
                        <Button style={btnstyle} disabled={isSubmitting} type="submit">Zaloguj</Button>
                    </Form>
                )}
                </Formik>
                        
            </Paper>
        </Grid>
        
        </div>
    )
}