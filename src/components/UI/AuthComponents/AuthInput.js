import React from "react";
import { TextField } from "@material-ui/core";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px 0",
      width: "100%",
    },
    input: {
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 30px white inset !important"
      }
    }
  })
);

const AuthInput = (props: any) => {
  const classes = useStyles();
  return <TextField className={classes.root} variant="outlined" inputProps={{className: classes.input}} {...props} />;
};

export default AuthInput;
