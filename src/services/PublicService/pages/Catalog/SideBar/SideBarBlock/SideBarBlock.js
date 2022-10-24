import React from 'react';
import s from './SideBarBlock.module.css'
import ThemeBlock from "./ThemeBlock/ThemeBlock";
import img from '../../../../../../static/img/Catalog/CatalogIcons/1.svg'
import {icons} from "../../CatalogIcons";


const SideBarBlock = ({title, list}) => {
    return (
        <div className={s.container}>
            <div className={s.title}>{title}</div>
            {list.map((block, index) => <ThemeBlock index={block.ID} img={icons[index]} name={block['name1']}  key={block.ID}/>)}
        </div>
    );
};

export default SideBarBlock;