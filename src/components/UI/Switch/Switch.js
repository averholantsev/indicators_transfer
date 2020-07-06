import React from "react";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

const SwitchLabels = (props) => {
  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Switch
            checked={props.checked}
            onChange={props.switchChange}
            color="primary"
          />
        }
        label={props.label}
      />
    </FormGroup>
  );
};

export default SwitchLabels;
