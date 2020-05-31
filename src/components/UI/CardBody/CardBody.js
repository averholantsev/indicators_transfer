import React from "react";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "20px 0",
  },
  cardPadding: {
    padding: "16px !important",
  }
});

const CardBody = (props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.cardPadding}>
        {props.children}
      </CardContent>
    </Card>
  );
};

export default CardBody;
