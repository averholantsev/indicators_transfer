import React from "react";
import { FormControlLabel, Checkbox, CheckboxProps } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const CSSFormControlLabel = withStyles({
  root: {
    float: "left"
  }
})(FormControlLabel);

const CSSCheckbox = withStyles({
  root: {
    color: "rgba(0, 0, 0, 0.54)",
    "&$checked": {
      color: "#2196F3"
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const AuthCheckbox = (props: any) => {
  return (
    <CSSFormControlLabel
      control={<CSSCheckbox value="rememberMe" color="default" />}
      {...props}
    />
  );
};

export default AuthCheckbox;
