import React from 'react';

import classes from './Input.module.css';

const Input = (props) => {
    let inputElement = null;
    let elementType = null;
    if (props.type === "text" || props.type === "email" || props.type === "password") {
        elementType = "text";
    }
    else if (props.type === "radio" || props.type === "checkbox") {
        elementType = "radio"
    }
    switch (elementType) {
        case ('text'):
            inputElement = <input
                style={{ backgroundColor: props.bgColor, color: props.textColor }}
                type={props.type}
                id={props.id}
                minLength={props.minLength}
                maxLength={props.maxLength}
            />;
            break;
        case ('radio'):
            inputElement = (<div style={{display: "flex"}}><input
                style={{ backgroundColor: props.bgColor, color: props.textColor }}
                type={props.type}
                id={props.id}
            />
                <label for={props.id}>{props.options}</label></div>);
            break;
        default:
            inputElement = <input
                style={{ backgroundColor: props.bgColor, color: props.textColor }}
                type={props.type}
                id={props.id}
                min={props.minLength}
                max={props.maxLength} />;
    }
    return (
        <div
            className={`${classes.control}`}>
            <label htmlFor={props.id}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
