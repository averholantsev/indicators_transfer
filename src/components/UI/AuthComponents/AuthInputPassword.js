import React from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const useStyles = makeStyles((theme) =>
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

export const AuthInputPassword = (props) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    showPassword: false
  });

  const handleClickShowPassword = () => {
    setState({ ...state, showPassword: !state.showPassword });
  };

  return (
    <TextField
      className={classes.root}
      variant="outlined"
      type={state.showPassword ? "text" : "password"}
      inputProps={{ className: classes.input }}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
            >
              {state.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
      {...props}
    />
  );
};

export default AuthInputPassword;
