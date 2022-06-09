import React, {useEffect, useState} from 'react';
import s from '../ModalRegistrationLesson.module.css'
import {messengersIcons} from "../MessengersIcons";
import privateProfileStore from "../../../../../store/privateProfileStore";


const SelectCommunicationType = ({communications, myCommunications, activeItem, setActiveItem}) => {
    return (
        <div className={s.communication_container}>
            {communications.map(com => <CommunicationType data={com} activeItem={activeItem}
                                                          myCommunications={myCommunications}
                                                          setActiveItem={setActiveItem} sendRequest={!myCommunications.includes(com.Messenger[0].ID)}/>)}

        </div>
    );
};

export default SelectCommunicationType;

const CommunicationType = ({data, activeItem, setActiveItem, myCommunications, sendRequest}) => {

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
             className={`${s.communication_item} ${activeItem?.loginId === data.ID ? s.communication_item_active : ''}`}
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
                   placeholder={`Логин от ${data.Messenger[0].Name}`} className={s.communication_item_input}/>}
            <img src={messengersIcons[data.Messenger[0].Name]} className={s.communication_logo} alt=""/>
        </div>
    )
}