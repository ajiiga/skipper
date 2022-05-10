import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from '../../../styles/MessageModals.module.css'
import {messengersIcons} from "../../../../PublicProfilesService/MentorProifle/ModalRegistrationLesson/MessengersIcons";


const ChangeCommunicationModal = ({id}) => {

    let [activeItem, setActiveItem] = useState(-1)

    let data = [{name: 'Skype', id: 'test1'}, {name: 'Discord', id: 'test2'}]

    return (
        <MessageModalContainer id={id} title={'Изменить способ коммуникации'}>
            <div className={s.communication_items}>
                {data.map((c, index) => <div
                    className={`${s.communication_item} ${activeItem === index ? s.communication_item_active : ''}`}
                    onClick={() => setActiveItem(index)}
                >
                    <div className={s.communication_item__information}>
                        <div>{c.name}</div>
                        <div>Ваш ID:</div>
                        <div>{c.id}</div>
                    </div>
                    <img src={messengersIcons[c.name]} alt=""/>
                </div>)}
            </div>
            <div className={s.submit_btn_container}>
                <button className={s.submit_btn} disabled={activeItem === -1}>
                    Отправить
                </button>
            </div>
        </MessageModalContainer>
    );
};

export default ChangeCommunicationModal;