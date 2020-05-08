import React from "react";
import { TextField } from "@material-ui/core";
import { Theme, makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: "10px 0",
      width: "100%",
      "&:hover label.MuiInputLabel-outlined": {
        color: "rgba(0, 0, 0, 0.87)"
      },
      "&:hover label.Mui-focused": {
        color: "#2196F3"
      },
      "& label.Mui-focused": {
        color: "#2196F3"
      },
      "& .MuiOutlinedInput-root": {
        "& fieldset": {
          borderColor: "rgba(0, 0, 0, 0.36)"
        },
        "&:hover fieldset": {
          borderColor: "rgba(0, 0, 0, 0.87)"
        },
        "&.Mui-focused fieldset": {
          borderColor: "#2196F3"
        }
      }
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
