import React from 'react';
import s from './SideBarBlock.module.css'
import ThemeBlock from "./ThemeBlock/ThemeBlock";


const SideBarBlock = ({title, list}) => {
    return (
        <div className={s.container}>
            <div className={s.title}>{title}</div>
            {list.map((block, index) => <ThemeBlock img={block.img} name={block.name} key={index}/>)}
        </div>
    );
};

export default SideBarBlock;