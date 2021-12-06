import React from 'react';
import s from './EditNavBar.module.css'
import search_icon from "../../../../../static/img/Main/search_icon.png";
import EditNavItem from "./EditNavItem/EditNavItem";

const EditNavBar = () => {
    return (
        <div className={s.container}>
            <div className={s.input_container}>
                <input className={s.input} placeholder={'Поиск'} type="text"/>
                <img className={s.search_icon} src={search_icon} alt=""/>
            </div>
            <div className={s.content_container}>
                <button className={s.add_btn}>+ создать новое занятие</button>
                <div className={s.items}>
                    <EditNavItem />
                    <EditNavItem />
                    <EditNavItem />
                    <EditNavItem />
                </div>
            </div>
        </div>
    );
};

export default EditNavBar;