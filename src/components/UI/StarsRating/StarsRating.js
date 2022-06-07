import React, {useState} from 'react';
import starImg from '../../../static/img/fill_star.svg'
import s from './StarsRating.module.css'

const StarsRating = ({selectedStar, setSelected}) => {

    let [hoverStar, setHover] = useState(undefined)

    const setStyleStar = (index) => {
        if (hoverStar !== undefined) {
            return hoverStar >= index ? '' : s.active_star
        }
        return selectedStar >= index ? '' : s.active_star
    }
    return (
        <div className={s.container}>
            {(Array(5).fill("")).map((star, index) => (
                <img src={starImg} className={setStyleStar(index)}
                     onMouseEnter={() => setHover(index)}
                     onMouseLeave={() => setHover(undefined)}
                     onClick={() => setSelected(index)}
                     alt=""/>
                ))}
        </div>
    );
};

export default StarsRating;