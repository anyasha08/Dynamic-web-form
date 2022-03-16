import React, { useState } from 'react';
import classes from './MetaDataForm.module.css';
const isEmpty = (value) => value.trim() === '';

const MetaDataForm = (props) => {
    const [enteredType, setEnteredType] = useState('text');
    const [enteredLabel, setEnteredLabel] = useState('');
    const [enteredBGColor, setEnteredBGColor] = useState('#ffffff');
    const [enteredTextColor, setEnteredTextColor] = useState('#000000');
    const [enteredMinLength, setMinLengthColor] = useState('');
    const [enteredMaxLength, setMaxLengthColor] = useState('');
    const [enteredOptions, setEnteredOptions] = useState('');
    const [formInputsValidity, setFormInputsValidity] = useState({
        label: true,
        minLength: true,
        maxLength: true,
        options: true
    });
    const typeChangeHandler = (event) => {
        setEnteredType(event.target.value);
        setFormInputsValidity({
            label: true,
            minLength: true,
            maxLength: true,
            options: true
        });
    };
    const labelChangeHandler = (event) => {
        setEnteredLabel(event.target.value);
    };
    const bgColorChangeHandler = (event) => {
        setEnteredBGColor(event.target.value);
    };
    const textColorChangeHandler = (event) => {
        setEnteredTextColor(event.target.value);
    };
    const maxLengthChangeHandler = (event) => {
        setMaxLengthColor(event.target.value);
    };
    const minLengthChangeHandler = (event) => {
        setMinLengthColor(event.target.value);
    };
    const optionsChangeHandler = (event) => {
        setEnteredOptions(event.target.value);
    };
    const submitHandler = (event) => {
        event.preventDefault();
        const enteredLabelIsValid = !isEmpty(enteredLabel);
        const enteredMinLengthIsValid = (enteredType !== "radio" && enteredType !== "checkbox") ? !isEmpty(enteredMinLength) : true;
        const enteredMaxLengthIsValid = (enteredType !== "radio" && enteredType !== "checkbox") ? !isEmpty(enteredMaxLength) : true;
        const enteredOptionsIsValid = (enteredType === "radio" || enteredType === "checkbox") ? !isEmpty(enteredOptions) : true;

        setFormInputsValidity({
            label: enteredLabelIsValid,
            minLength: enteredMinLengthIsValid,
            maxLength: enteredMaxLengthIsValid,
            options: enteredOptionsIsValid
        });

        const formIsValid =
            enteredLabelIsValid &&
            enteredMinLengthIsValid &&
            enteredMaxLengthIsValid &&
            enteredOptionsIsValid;

        if (!formIsValid) {
            return;
        }
        const formData = {
            type: enteredType,
            label: enteredLabel,
            bgColor: enteredBGColor,
            textColor: enteredTextColor,
            minLength: enteredMinLength,
            maxLength: enteredMaxLength,
            options: enteredOptions
        };
        props.onSaveFormData(formData);
        setEnteredType('text');
        setEnteredLabel('');
        setEnteredBGColor('#ffffff');
        setEnteredTextColor('#000000');
        setMinLengthColor('');
        setMaxLengthColor('');
        setEnteredOptions('');
    }
    let divToShow = null;

    const labelControlClasses = `${classes.newDataControl} ${formInputsValidity.label ? '' : classes.invalid}`;
    const minLengthControlClasses = `${classes.newDataControl} ${formInputsValidity.minLength ? '' : classes.invalid}`;
    const maxLengthControlClasses = `${classes.newDataControl} ${formInputsValidity.maxLength ? '' : classes.invalid}`;
    const optionsControlClasses = `${classes.newDataControl} ${formInputsValidity.options ? '' : classes.invalid}`;
    if (enteredType === "password" || enteredType === "text" || enteredType === "email") {
        divToShow = (
            <div>
                <div className={minLengthControlClasses}>
                    <label>Specify Min length</label>
                    <input type="number" min="1" step="1" value={enteredMinLength} onChange={minLengthChangeHandler} />
                    {!formInputsValidity.minLength && <div className={classes.invalidText}>Please enter a valid input!</div>}
                </div>
                <div className={maxLengthControlClasses}>
                    <label>Specify Max length</label>
                    <input type="number" min="1" step="1" value={enteredMaxLength} onChange={maxLengthChangeHandler} />
                    {!formInputsValidity.maxLength && <div className={classes.invalidText}>Please enter a valid input!</div>}
                </div>
            </div>
        );
    }
    else if (enteredType === "date") {
        divToShow = (
            <div>
                <div className={minLengthControlClasses}>
                    <label>Specify Min Date</label>
                    <input type="date" value={enteredMinLength} onChange={minLengthChangeHandler} />
                    {!formInputsValidity.minLength && <div className={classes.invalidText}>Please enter a valid input!</div>}
                </div>
                <div className={maxLengthControlClasses}>
                    <label>Specify Max Date</label>
                    <input type="date" value={enteredMaxLength} onChange={maxLengthChangeHandler} />
                    {!formInputsValidity.maxLength && <div className={classes.invalidText}>Please enter a valid input!</div>}
                </div>
            </div>
        );
    }
    else if (enteredType === "radio" || enteredType === "checkbox") {
        divToShow = (
            <div>
                <div className={optionsControlClasses}>
                    <label>Specify Option</label>
                    <input type="text" value={enteredOptions} onChange={optionsChangeHandler} />
                    {!formInputsValidity.options && <div className={classes.invalidText}>Please enter a valid input!</div>}
                </div>
            </div>
        );
    }
    return (
        <form onSubmit={submitHandler}>
            <div className={classes.newDataControls}>
                <div className={classes.newDataControl}>
                    <label>Select Input Type</label>
                    <select value={enteredType} onChange={typeChangeHandler}>
                        <option value="text">Text</option>
                        <option value="date">Date</option>
                        <option value="password">Password</option>
                        <option value="email">Email</option>
                        <option value="radio">Radio</option>
                        <option value="checkbox">Checkbox</option>
                    </select>
                </div>
                <div className={labelControlClasses}>
                    <label>Specify Label</label>
                    <input type="text" value={enteredLabel} onChange={labelChangeHandler} />
                    {!formInputsValidity.label && <div className={classes.invalidText}>Please enter a valid input!</div>}
                </div>
                {divToShow}
                <div className={classes.newDataControl}>
                    <label>Specify Background Color</label>
                    <input className={classes.newDataColor} type="color" value={enteredBGColor} onChange={bgColorChangeHandler} />
                </div>
                <div className={classes.newDataControl}>
                    <label>Specify Text Color</label>
                    <input className={classes.newDataColor} type="color" value={enteredTextColor} onChange={textColorChangeHandler} />
                </div>
            </div>
            <div className={classes.newDataActions}>
                <button type="button" onClick={props.stopEditing}>Cancel</button>
                <button type="submit">Add</button>
            </div>
        </form>
    );
}

export default MetaDataForm;