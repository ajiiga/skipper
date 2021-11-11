import React from 'react';
import s from './SideBarBlock.module.css'
import ThemeBlock from "./ThemeBlock/ThemeBlock";
import img from '../../../../../../static/img/Catalog/CatalogIcons/1.svg'
import {icons} from "../../CatalogIcons";


const SideBarBlock = ({title, list, setActiveTheme}) => {
    return (
        <div className={s.container}>
            <div className={s.title}>{title}</div>
            {list.map((block, index) => <ThemeBlock index={block.ID} img={icons[1]} name={block['name1']} setActiveTheme={setActiveTheme} key={index}/>)}
        </div>
    );
};

export default SideBarBlock;