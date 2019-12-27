import React from 'react';

const inputNum = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input 
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.changed}
        value={props.value}
        required={props.required}
      />
    </div>
  )
};

export default inputNum;
