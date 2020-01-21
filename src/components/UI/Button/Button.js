import React from "react";

const button = props => {
  return (
    <button className={props.classUI} type={props.type} onClick={props.clicked} style={props.style} >
      {props.name}
    </button>
  );
};

export default button;
