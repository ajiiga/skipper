import React, {useEffect, useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from '../../../styles/MessageModals.module.css'
import {messengersIcons} from "../../../../PublicProfilesService/MentorProifle/ModalRegistrationLesson/MessengersIcons";
import useQuery from "../../../../../CustomHooks/useQuery";
import myClassesStore from "../../../../../store/myClassesStore";
import SelectCommunicationType
    from "../../../../PublicProfilesService/MentorProifle/ModalRegistrationLesson/SelectCommunicationType/SelectCommunicationType";
import privateProfileStore from "../../../../../store/privateProfileStore";
import publicProfileStore from "../../../../../store/publicProfileStore";
import messagesStore from "../../../../../store/messagesStore";
import {useHistory} from "react-router-dom";


const ChangeCommunicationModal = ({id}) => {

    const history = useHistory()


    let [activeItem, setActiveItem] = useState(-1)

    let query = useQuery()

    let class_id = query.get("class_id")
    let is_notification = query.get("is_notification") === 'true'
    let active_item_id = parseInt(query.get("active_item"))

    //let data = [{name: 'Skype', id: 'test1'}, {name: 'Discord', id: 'test2'}]

    let [isFetching, setIsFetching] = useState(true)
    let [communication, setCommunication] = useState([])
    let [myCommunications, setMyCommunications] = useState([])
    let [disabled, setDisabled] = useState(true)

    const closeModal = () => {
        history.push(`/messages/${id}`)
    }
    const handleClick = () => {
        if (activeItem.sendRequest) {
            privateProfileStore.addCommunication(activeItem?.messengerId, activeItem.loginText).then(r => {
                messagesStore.changeCommunication(parseInt(class_id), activeItem.loginId).then(x => closeModal())
            })
        } else {
            messagesStore.changeCommunication(parseInt(class_id), activeItem.loginId).then(x => closeModal())
        }
    }

    useEffect(() => {
        myClassesStore.getCommunication(class_id).then(com => {
            setCommunication(com)
            privateProfileStore.getMyCommunications().then(data => {
                let communicationList = data.map(com => com.Messenger[0].ID)
                let communicationListNoRepeat = [...new Set(communicationList)]
                setMyCommunications(communicationListNoRepeat)
                if (active_item_id)
                    setActiveItem({
                        loginId: active_item_id,
                        loginText: '',
                        sendRequest: false
                    })
            })
        })

    }, [])

    useEffect(() => {

        if (activeItem.sendRequest && activeItem.loginText === '' || activeItem === -1) {
            setDisabled(true)
        } else setDisabled(false)
    }, [activeItem])

    return (
        <MessageModalContainer id={id} title={'Изменить способ коммуникации'}>
            <SelectCommunicationType setActiveItem={setActiveItem} activeItem={activeItem}
                                     communications={communication} myCommunications={myCommunications}
                                     forChange={true}/>
            {is_notification ? <div className={s.mentor_change_lesson_dates__buttons_container}>
                    <button className={s.mentor_change_lesson_dates__submit_button} onClick={closeModal}>Принять изменения
                    </button>
                    <button className={s.mentor_change_lesson_dates__change_button} onClick={handleClick}>Предложить
                        другой способ
                    </button>
                </div>
                :
                (
                    <div className={s.submit_btn_container}>
                        <button disabled={disabled} onClick={handleClick} className={s.submit_btn}
                                style={{marginTop: '0px'}}>Отправить
                        </button>
                    </div>)}
        </MessageModalContainer>
    );
};

export default ChangeCommunicationModal;