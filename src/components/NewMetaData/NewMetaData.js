import React, {useState} from 'react';
import './NewMetaData.css';
import MetaDataForm from './MetaDataForm';
const NewMetaData = (props) => {
    const [isEditing, setIsEditing] = useState(false);
    const saveFormDataHandler = (enteredFormData) => {
        const formData = {
            ...enteredFormData,
            id: Math.floor(Math.random() * 100).toString()
        };
        props.onAddData(formData);
        setIsEditing(false);
    }
    const startEditingHandler = () => {
        setIsEditing(true);
    }
    const stopEditingHandler = () => {
        setIsEditing(false);
    }
    return (
        <div className="new-meta-data">
            {!isEditing && <button onClick={startEditingHandler}>Add New Input</button>}
            {isEditing && <MetaDataForm stopEditing={stopEditingHandler} onSaveFormData={saveFormDataHandler} />}
        </div>
    );
}

export default NewMetaData;