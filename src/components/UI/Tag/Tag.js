import React from 'react';
import s from './Tag.module.css'
import img from '../../../static/img/delete.svg'

const Tag = ({title, onClick}) => {
    if (onClick)
        return (
            <div className={s.tag} onClick={() => onClick()} style={{cursor: 'pointer'}}>
                {title}
                <img src={img} className={s.delete_icon} alt=""/>
            </div>
        );

    return (
        <div className={s.tag}>
            {title}
        </div>
    );
};

export default Tag;