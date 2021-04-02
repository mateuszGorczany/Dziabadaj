
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { Typography } from "@material-ui/core"
import { useState, useEffect } from "react"
import { fetcher, getToken } from "../../utils/utils"
import { Grid, Paper } from "@material-ui/core"
import { styles } from "../styles"
import { API } from "../../App"

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const paperStyle = {
    padding: 20,
    height: "80vh",
    width: 330,
    margin: "10px auto",
}

export function UserInfo() {
    const URL = "/resources/patients/current"
    const [data, setData] = useState(null)
    useEffect(() =>
    {
        fetcher(API + URL, setData, {
            method: "GET",
            headers: {
                "x-access-tokens": getToken()
            }
        })
    }, [])

    console.log(data)
    return (
        <div>
        <Grid>
            { data && (
                <div>
                                
                    <List className>
            <Paper elevation={10} style={{ ...paperStyle, ...styles.glassMorphism }}>
            <ListItem>
                <ListItemText primary={data.fname} secondary="imię" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.lname} secondary="nazwisko" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.bdate} secondary="data urodzenia" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.email} secondary="email" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.phone} secondary="telefon" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.pesel} secondary="pesel" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.city} secondary="miasto" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.street} secondary="ulica" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.homeNumber} secondary="numer domu" />
            </ListItem>
            <ListItem>
                <ListItemText primary={data.zip} secondary="kod pocztowy" />
            </ListItem>
                </Paper>
            </List>
                </div>
            )}
            </Grid>
        </div>
    )
}