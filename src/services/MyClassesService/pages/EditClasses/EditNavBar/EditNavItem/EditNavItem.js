import React from 'react';
import s from '../EditNavBar.module.css'
import img from '../../../../../../static/img/EditClasses/arrow.svg'
import selected_arrow from '../../../../../../static/img/EditClasses/selected_arrow.svg'
import {Link, useHistory} from "react-router-dom";

const EditNavItem = ({name, type, setActiveItem, id, active}) => {



    return (

            <div className={`${s.item_container} ${active ? s.active_item : ''}`} onClick={() => {
                setActiveItem(id)
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