import React from 'react';
import s from './TextInput.module.css'

const TextInput = (props) => {
    return (
        <input type="text" className={s.input} {...props}/>
    );
};

export default TextInput;