import React from "react";
import { TextField } from "@material-ui/core";
import NumberFormat from "react-number-format";

const NumberTextField = (props) => {
  return (
    <NumberFormat
      {...props}
      type="tel"
      style={{ width: "100%" }}
      thousandSeparator={" "}
      decimalSeparator="."
      decimalScale={2}
      allowNegative={false}
      customInput={TextField}
    />
  );
};

export default NumberTextField;
