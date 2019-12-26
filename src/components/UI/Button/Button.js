import React from 'react';

const button = (props) => {
  return <button onClick={props.clicked}>{props.name}</button>
};

export default button;
