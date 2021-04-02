import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button";
import { styles } from "../styles"
import { Link } from "react-router-dom"
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict"
import { expireTime, isLoggedIn } from "../../utils/utils";
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color: "black"
  },
}));

export default function MyAppBar() {
  let history = useHistory()
  const classes = useStyles();
  const [auth, setAuth] = React.useState(isLoggedIn());
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  let expire = expireTime() 
  const [timeleft, setTimeLeft] = React.useState(expire)
  useEffect(() =>
  {
    if (expire === 0)
      return
    setAuth(true)
    try
    {

      const timer = setTimeout(() =>
      {
        setTimeLeft(formatDistanceToNowStrict(expireTime(), {unit: "second"}))  
        if (expireTime() === 0)
        {
          setTimeLeft(0)
          setAuth(false)
        }
      }, 1000)
    }
    catch (e)
    {
      let be = "empty block"

    }
    console.log(timeleft)
  })

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={styles.glassMorphism}>
        <Toolbar>
          <Button onClick={()=> (history.push("/"))}>

          <Typography variant="h6" className={classes.title}>
            Dziabadaj
          </Typography>
          </Button>
          {!auth && (
            <Button component={Link} to="/login">Login</Button>
          )}
          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                // color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={handleClose}
                
              >
                <MenuItem onClick={() => { handleClose(); history.push("/details") }}>Szczegóły konta</MenuItem>
                <MenuItem onClick={() => { handleClose(); history.push("/vaccinations") }}>Zaplanowane szczepenia</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
        </AppBar>
          { timeleft ? `Do wylogowania pozostało: ${timeleft}` : ""}
    </div>
  );
}
