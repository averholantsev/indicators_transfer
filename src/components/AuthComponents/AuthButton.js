import React from "react";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CSSButton = withStyles({
  root: {
    width: "100%",
    textTransform: "none",
    margin: "30px 0 10px 0",
    backgroundColor: "#2196F3",
    "&:hover": {
      backgroundColor: "#2F80ED"
    }
  }
})(Button);

const AuthButton = (props: any) => {
  return <CSSButton variant="contained" color="primary" {...props}>{props.children}</CSSButton>;
};

export default AuthButton;
