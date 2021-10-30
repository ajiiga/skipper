import React from 'react';
import s from './SideBarBlock.module.css'
import ThemeBlock from "./ThemeBlock/ThemeBlock";
import img from '../../../../../../static/img/Catalog/CatalogIcons/1.svg'
import {icons} from "../../CatalogIcons";


const SideBarBlock = ({title, list, setActiveTheme}) => {
    return (
        <div className={s.container}>
            <div className={s.title}>{title}</div>
            {list.map((block, index) => <ThemeBlock index={block.index} img={icons[block.logo]} name={block.name} setActiveTheme={setActiveTheme} key={index}/>)}
        </div>
    );
};

export default SideBarBlock;