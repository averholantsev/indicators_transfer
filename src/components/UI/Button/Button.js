import React from 'react';

const button = (props) => {
  return <button className={props.classUI} type={props.type} onClick={props.clicked}>{props.name}</button>
};

export default button;
