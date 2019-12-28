import React from 'react';
import NumberFormat from 'react-number-format';

const inputNum = (props) => {
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
    </div>
  )
};

export default inputNum;
