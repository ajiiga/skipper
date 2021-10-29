import React from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from './Catalog.module.css'
import Button from "../../../../components/UI/Button/Button";
import SideBar from "./SideBar/SideBar";

const Catalog = () => {
    return (
        <div className={s.container}>
            <div className={s.content_container}>
                <div className={s.fixed_sidebar}>
                    <MiniNavBar child={'Каталог'}/>
                    <SideBar/>
                </div>
                <div className={s.fake_sidebar}/>
                <div>hello</div>
            </div>
        </div>
    );
};

export default Catalog;