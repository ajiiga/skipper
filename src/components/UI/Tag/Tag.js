import React from 'react';
import s from './Tag.module.css'

const Tag = ({title, onClick}) => {
    if (onClick)
        return (
            <div className={s.tag} onClick={() => onClick()} style={{cursor: 'pointer'}}>
                <div className={s.circle}/>
                {title}
            </div>
        );

    return (
        <div className={s.tag}>
            <div className={s.circle}/>
            {title}
        </div>
    );
};

export default Tag;