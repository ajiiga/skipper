import React, {useEffect, useState} from 'react';
import s from '../ModalRegistrationLesson.module.css'
import {messengersIcons} from "../MessengersIcons";
import privateProfileStore from "../../../../../store/privateProfileStore";
import ChatButton from "../../../../../components/UI/ChatButton/ChatButton";
import {useParams} from "react-router-dom";


const SelectCommunicationType = ({communications, myCommunications, activeItem, setActiveItem, forChange, user_id}) => {
    return (
        <div className={`${s.communication_container} ${forChange ? s.communication_container_for_change : ''}`}>
            {communications.length ? communications.map(com => <CommunicationType data={com} activeItem={activeItem}
                                                                                  myCommunications={myCommunications}
                                                                                  setActiveItem={setActiveItem}
                                                                                  sendRequest={!myCommunications.includes(com.Messenger[0].ID)}
                                                                                  forChange={forChange}/>) :
                <div className={s.empty_communication}>
                    <div className={s.empty_communication__title}>К сожалению ментор не указал удобный для него способ
                        связи. Вы можете попросить его сделать это
                    </div>
                    <div className={s.chat_btn_container}>
                        <ChatButton id={user_id}/>
                    </div>
                </div>}

        </div>
    );
};

export default SelectCommunicationType;

const CommunicationType = ({data, activeItem, setActiveItem, myCommunications, sendRequest, forChange}) => {

    let [textInput, setTextInput] = useState('')

    useEffect(() => {
        if (data.ID === activeItem?.loginId) {
            setActiveItem({
                loginId: data.ID,
                messengerId: data.Messenger[0].ID,
                loginText: textInput,
                sendRequest: sendRequest
            })
        }
    }, [textInput])

    return (
        <div key={data.ID}
             className={`${s.communication_item} ${activeItem?.loginId === data.ID ? s.communication_item_active : ''} ${forChange ? s.communication_item_for_change : ''}`}
             onClick={() => setActiveItem({
                 loginId: data.ID,
                 messengerId: data.Messenger[0].ID,
                 loginText: textInput,
                 sendRequest: sendRequest
             })}>
            <div className={s.communication_item_text}>
                <div className={s.communication_item_title}>{data.Messenger[0].Name}</div>
            </div>
            {sendRequest &&
                <input type="text" value={textInput} onChange={e => setTextInput(e.target.value)}
                       placeholder={`Логин от ${data.Messenger[0].Name}`}
                       className={`${s.communication_item_input} ${forChange ? s.communication_item_input_for_change : ''}`}/>}
            <img src={messengersIcons[data.Messenger[0].Name]} className={s.communication_logo} alt=""/>
        </div>
    )
}