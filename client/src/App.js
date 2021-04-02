import FormDziabadaj from "./components/Form"
import MyAppBar from "./components/Navbar"
import { Login }from "./components/Login"
import { UserInfo }from "./components/UserInfo"
import { FormVaccinate }from "./components/Vaccinate"
import {
    makeStyles, Typography,
} from "@material-ui/core"
import "./App.css"
import { Switch, Route, BrowserRouter } from "react-router-dom"
import { useState } from "react"
import { sender, OfflineDatabase } from "./utils/utils"

export const API = "/api/v1/"

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

function App()
{
    const [IsLogged, setLogged] = useState(false)

    addEventListener("load", ()=>
    {

        function updateOnlineStatus(event) {
            const isOnline = navigator.onLine
            if (isOnline) {
                const URL = API + "resources/patients/create"
                const idb = new OfflineDatabase("offDB", 1, "formData", "email")
                idb.getAll("formData").then(result => {
                    result.forEach(element => {
                        sender(URL, element)        
                    })
                }
                )
                idb.deleteAll("formData").then(e => alert("Wysłano zachowane dane"))
            }
        }

      addEventListener("online",  updateOnlineStatus);
      addEventListener("offline", updateOnlineStatus);
    })
      
    return (
      <BrowserRouter>

        <div className="App">
            <MyAppBar />
        <Switch >
          <Route path="/login">
              <Login loginSetter={ setLogged }/>
          </Route>
          <Route path="/details">
              <UserInfo />
          </Route>
          <Route path="/vaccinations">
            <FormVaccinate></FormVaccinate>
          </Route>
          <Route exact path="/">
              {() => {
                console.log({ IsLogged })
                return IsLogged ? <UserInfo/> : <FormDziabadaj />
              }
              }
          </Route>
            </Switch>
        </div>
      </BrowserRouter>
    )
}

export default App
