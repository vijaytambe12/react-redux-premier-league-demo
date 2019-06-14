import React from "react";
import "./button.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export const Button = (props) => {

  return <button
      onClick={props.onClick} className="button">
    {props.icon? <FontAwesomeIcon icon={props.icon}/> : ""} {props.name}
  </button>
};
