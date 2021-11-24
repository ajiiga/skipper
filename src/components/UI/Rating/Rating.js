import React from 'react';
import s from './Rating.module.css'

const Rating = ({num}) => {
    return (
        <div className={s.rating}>
            {num}
        </div>
    );
};

export default Rating;