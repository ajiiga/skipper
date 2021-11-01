import React, {useState} from 'react';
import s from './InputRadio.module.css'

const InputRadio = ({list, activeItem, setActiveItem}) => {

    return (
        <div className={s.container}>
            {list.map(x => <div className={s.item} onClick={() => setActiveItem(x)}>
                <div className={`${s.circle} ${x === activeItem ? s.active : ''}`}/>
                {x}</ div>)}
        </div>
    );
};

export default InputRadio;