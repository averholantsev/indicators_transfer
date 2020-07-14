import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {CircularProgress, Typography} from "@material-ui/core";
import Text from '../Text/Text'

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "15px",
  },
  paragraph: {
    marginTop: "5px",
  },
}));

const Loader = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.root} {...props}>
      <CircularProgress />
      <Typography className={classes.paragraph}><Text tid="loading" /></Typography>
    </div>
  );
};

export default Loader;
