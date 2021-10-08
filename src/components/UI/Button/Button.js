import React from 'react';
import s from './Button.module.css'

const Button = ({title, onClick, disabled}) => {
    return (
        <button type="button" className={s.btn} onClick={onClick} disabled={disabled}>
            {title}
        </button>
    );
};

export default Button;