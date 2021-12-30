import React from 'react';
import s from './RateDisplay.module.css'
import fill_star from '../../../static/img/fill_star.svg'
import star from '../../../static/img/star.svg'
import Rating from "../Rating/Rating";

const RateDisplay = ({rate}) => {
    let intRate = Math.round(rate)
    let fill_stars = Array.apply(fill_star, Array(intRate)).map(function () {})
    let empty_stars = Array.apply(fill_star, Array(5 - intRate)).map(function () {})
    return (
        <div className={s.container}>
            <div className={s.stars}>
                {fill_stars.map((x, index) => <img key={index} src={fill_star} alt=""/>)}
                {empty_stars.map((x, index) => <img key={index} src={star} alt=""/>)}
            </div>
            <Rating num={rate}/>
        </div>
    );
};

export default RateDisplay;