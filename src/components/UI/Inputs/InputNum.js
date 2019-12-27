import React from 'react';

const input = (props) => {
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      <input 
        id={props.id}
        placeholder={props.placeholder}
        name={props.name}
        onChange={props.changed}
        type={props.type}
        min={props.min}
      >
        {props.inputValue}
      </input>
    </div>
  )
};

export default input;
