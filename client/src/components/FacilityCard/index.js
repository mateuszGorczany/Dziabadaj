import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
        minWidth: 275,
      maxWidth:500,
  },
  bullet: {
    display: "inline-block",
    // margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {props.data.clinic_name}
        </Typography>
        <Typography variant="h5" component="h2">
            {props.data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            dzienny limit: {props.data.daily_limit} 
        </Typography>
        <Typography variant="body2" component="p">
    miasto: {props.data.city}
        </Typography>
        <Typography>
    kod-pocztowy: {props.data.zip}
        </Typography>
        <Typography>
    ulica: {props.data.street}
        </Typography>
        <Typography>
    numer budynku: {props.data.building_number}
        </Typography>
        <Typography>
    telefon: {props.data.phone}
        </Typography>
        <Typography>
    email: {props.data.email}
        </Typography>
        <Typography>
    informacje kontaktowe: {props.data.contact_info}
        </Typography>
        <Typography>
    informacje o placówce: {props.data.facility_info}
        </Typography>
        <Typography>
    kraj: {props.data.country}
        </Typography>
      </CardContent>
      <CardActions>
              <Button size="small" onClick={() => {
                  props.idSetter(props.data.id)
              }}>Wybierz</Button>
      </CardActions>
    </Card>
  );
}
