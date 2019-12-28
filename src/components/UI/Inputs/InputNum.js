import React from 'react';
import NumberFormat from 'react-number-format';

const inputNum = (props) => {
  const alertMessage = (<div className="ui pointing red basic label">{props.errorMessage}</div>);
  return (
    <div className={props.classEnter}>
      <label htmlFor={props.id}>{props.label}</label>
      <NumberFormat
        decimalScale="2"
        decimalSeparator="."
        allowNegative={false}
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.changed}
        value={props.value}
      />
      {props.invalid ? null : alertMessage}
    </div>
  )
};

export default inputNum;
