import React from 'react';
import s from "./SideBar.module.css";
import SideBarBlock from "./SideBarBlock/SideBarBlock";
import img from '../../../../../static/img/Catalog/CatalogIcons/1.svg'
import MiniNavBar from "../../../../../components/UI/MiniNavBar/MiniNavBar";

const SideBar = ({items, activeTheme, setActiveTheme}) => {

    return (
            <div className={s.container}>
                <div className={s.title}>Каталог</div>
                {items.map(x => <SideBarBlock title={x.title}  list={x.list} setActiveTheme={setActiveTheme}/>)}
            </div>
    );
};

export default SideBar;