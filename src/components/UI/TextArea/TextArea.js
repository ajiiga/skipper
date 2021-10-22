import React from 'react';
import s from './TextArea.module.css'

const TextArea = (props) => {
    return (
        <textarea {...props} className={s.textarea}>

        </textarea>
    );
};

export default TextArea;