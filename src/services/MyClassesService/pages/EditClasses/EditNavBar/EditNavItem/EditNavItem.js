import React from 'react';
import s from '../EditNavBar.module.css'
import img from '../../../../../../static/img/EditClasses/arrow.svg'
import selected_arrow from '../../../../../../static/img/EditClasses/selected_arrow.svg'
import {Link, useHistory} from "react-router-dom";

const EditNavItem = ({name, type, setActiveItem, id, active}) => {

    let history = useHistory()

    let getUrl = (type) => {
        switch (type) {
            case 'Решение под ключ':
                return '/edit-classes/turnkey-lesson'
            case 'Практическое занятие':
                return '/edit-classes/practice-classes'
            case 'Теоретическое занятие':
                return '/edit-classes/theory-classes'
        }
    }

    return (

            <div className={`${s.item_container} ${active ? s.active_item : ''}`} onClick={() => {
                setActiveItem(id)
                history.push(getUrl(type))
            }}>
                <div className={s.item_block}>
                    <div className={s.text}>
                        <div className={s.title}>{name}</div>
                        <div className={s.type}>{type}</div>
                    </div>
                    <img src={active ? selected_arrow : img} alt=""/>
                </div>
            </div>

    );
};

export default EditNavItem;