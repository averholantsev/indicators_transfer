import React from "react";
import { Alert } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

const CSSAlert = withStyles({
  root: {
    marginBottom: "10px",
  },
})(Alert);

export const AuthAlert = (props) => {
  return <CSSAlert {...props}>{props.children}</CSSAlert>;
};

export default AuthAlert;
