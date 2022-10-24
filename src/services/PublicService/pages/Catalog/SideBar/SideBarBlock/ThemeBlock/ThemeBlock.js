import React from 'react';
import s from './ThemeBlock.module.css'
import arrow from '../../../../../../../static/img/Catalog/SideBar/sidebar_arrow.svg'
import {Link, useParams} from "react-router-dom";

const ThemeBlock = ({name, img, index}) => {
    let params = useParams()
    let id = params.id

    return (
        <Link className={s.container} to={`/catalog/${index}`}>
            <div className={`${s.left_side} ${index == id ? s.active: ''}`}>
                <img src={img} alt=""/>
                {name.length > 20? `${name.slice(0, 20)}...` : name}
            </div>
            <img src={arrow} alt=""/>
        </Link>
    );
};

export default ThemeBlock;