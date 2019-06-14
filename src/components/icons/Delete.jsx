import React from "react";

import "./Delete.css"

export const Delete = (props) => {
    return <div className="icon" onClick={props.onClick}>
        <div className="lid"/>
        <div className="lidcap"/>
        <div className="bin"/>
    </div>
};
