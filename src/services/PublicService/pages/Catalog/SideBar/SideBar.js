import React from 'react';
import s from "./SideBar.module.css";
import SideBarBlock from "./SideBarBlock/SideBarBlock";
import img from '../../../../../static/img/Catalog/CatalogIcons/1.svg'
import MiniNavBar from "../../../../../components/UI/MiniNavBar/MiniNavBar";

const SideBar = ({items, activeTheme, setActiveTheme}) => {
    return (
            <div className={s.container}>
                <div className={s.title}>Каталог</div>
                {items.map(x => {
                    let jsonX = JSON.parse(x)
                    return <SideBarBlock key={jsonX.ID} title={jsonX['name0']} list={jsonX['Child0']} setActiveTheme={setActiveTheme}/>
                })}
            </div>
    );
};

export default SideBar;