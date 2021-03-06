
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

export default function VaccinationCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          status: {props.data.status}
        </Typography>
        <Typography variant="h5" component="h2">
            {props.data.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
    miasto: {props.data.city}
        </Typography>
        <Typography variant="body2" component="p">
            data: {props.data.date}
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
      </CardContent>
    </Card>
  );
}



