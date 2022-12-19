import React from 'react';
import s from './Button.module.css'

const Button = ({title, onClick, disabled, uppercase=true}) => {
    return (
        <button type="button" className={s.btn} onClick={onClick} disabled={disabled} style={{textTransform: uppercase? 'uppercase' : 'none'}}>
            {title}
        </button>
    );
};

export default Button;