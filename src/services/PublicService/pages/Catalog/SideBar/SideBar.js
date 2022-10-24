import React from 'react';
import s from "./SideBar.module.css";
import SideBarBlock from "./SideBarBlock/SideBarBlock";
import img from '../../../../../static/img/Catalog/CatalogIcons/1.svg'
import MiniNavBar from "../../../../../components/UI/MiniNavBar/MiniNavBar";

const SideBar = ({items, activeTheme}) => {
    let jsonItems = JSON.parse(items)
    return (
            <div className={s.container}>
                <div className={s.title}>Каталог</div>
                {jsonItems.map(x => {
                    return <SideBarBlock key={x.ID} title={x['name0']} list={x['Child0']} activeTheme={activeTheme}/>
                })}
            </div>
    );
};

export default SideBar;