import React from 'react';
import s from "./SideBar.module.css";
import SideBarBlock from "./SideBarBlock/SideBarBlock";
import img from '../../../../../static/img/Catalog/SideBar/sidebar_logo.svg'
import MiniNavBar from "../../../../../components/UI/MiniNavBar/MiniNavBar";

const SideBar = () => {

    let title = 'IT и технологии'
    let list = [
        {name: 'Тестирование', img: img},
        {name: 'Тестирование', img: img},
        {name: 'Тестирование', img: img}
    ]

    return (
            <div className={s.container}>
                <div className={s.title}>Каталог</div>
                <SideBarBlock title={title} list={list}/>
            </div>
    );
};

export default SideBar;