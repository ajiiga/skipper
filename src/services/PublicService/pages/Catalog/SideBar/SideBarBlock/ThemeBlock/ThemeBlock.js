import React from 'react';
import s from './ThemeBlock.module.css'
import arrow from '../../../../../../../static/img/Catalog/SideBar/sidebar_arrow.svg'

const ThemeBlock = ({name, img, index, setActiveTheme, isActiveTheme}) => {
    return (
        <div className={s.container} onClick={() => setActiveTheme(index)}>
            <div className={`${s.left_side} ${isActiveTheme ? s.active: ''}`}>
                <img src={img} alt=""/>
                {name.length > 15? `${name.slice(0, 15)}...` : name}
            </div>
            <img src={arrow} alt=""/>
        </div>
    );
};

export default ThemeBlock;