import React from 'react';
import s from '../ModalRegistrationLesson.module.css'
import {messengersIcons} from "../MessengersIcons";


const SelectCommunicationType = ({communications, activeItem, setActiveItem}) => {
    return (
        <div className={s.communication_container}>
            {communications.map(x => <div key={x.ID} className={`${s.communication_item} ${activeItem === x.ID ? s.communication_item_active : ''}`} onClick={() => setActiveItem(x.ID)}>
                <div className={s.communication_item_text}>
                    <div className={s.communication_item_title}>{x.Messenger[0].Name}</div>

                </div>
                <img src={messengersIcons[x.Messenger[0].Name]} className={s.communication_logo} alt=""/>
            </div>)}

        </div>
    );
};

export default SelectCommunicationType;