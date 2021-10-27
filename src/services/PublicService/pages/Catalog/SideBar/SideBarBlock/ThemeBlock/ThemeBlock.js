import React from 'react';
import s from './ThemeBlock.module.css'
import arrow from '../../../../../../../static/img/Catalog/SideBar/sidebar_arrow.svg'

const ThemeBlock = ({name, img}) => {
    return (
        <div className={s.container}>
            <div className={s.left_side}>
                <img src={img} alt=""/>
                {name}
            </div>
            <img src={arrow} alt=""/>
        </div>
    );
};

export default ThemeBlock;