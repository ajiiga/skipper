import React, {useEffect, useState} from 'react';
import s from './NotificationModal.module.css'
import img from '../../../static/img/skipper_logo.svg'
import closeImg from '../../../static/img/delete.svg'
import messagesStore from "../../../store/messagesStore";
import {Link, useHistory} from 'react-router-dom'
import authStore from "../../../store/authStore";
import {observer} from "mobx-react-lite";

const NotificationBlock = ({data}) => {

    let refactorDate = messagesStore.refactorDate(data.CreatedAt)


    let history = useHistory()

    let [text, setText] = useState('')
    let [notificationData, setData] = useState({})

    useEffect(() => {
        let jsonData = JSON.parse(data.Data)
        setData(jsonData)
        switch (data["Type"]) {
            case "lesson complete":
                setText(`Прошло одно из занятий по "${jsonData.class_name}". Вы можете его оценить`)
                break;
            case "class completed":
                setText(`Расскажите нам пожалуйста, как прошли ваши занятия по "${jsonData.class_name}". Это поможет нам
                    стать лучше.`)
                break;
            case "time change":
                setText(`Предлагает вам изменить время занятий`)
                break;
            case "status change":
                switch (jsonData.old_status) {
                    case 'consideration':
                        if (jsonData.new_status === 'canceled')
                            setText(jsonData.is_mentor? `Менти отменил заявку по занятию "${jsonData.class_name}"` : `Ментор отклонил ваше предложение о занятии по "${jsonData.class_name}"`)
                        else
                            setText(`Ментор принял вашу заявку на занятие "${jsonData.class_name}"`)
                        break;
                    case 'planned':
                        setText(`Пользователь прекратил занятия "${jsonData.class_name}"`)
                        break;
                    default:
                        setText(`У занятия "${jsonData.class_name}" поменялся статус с "${messagesStore.notificationTypes[jsonData.old_status]}" на "${messagesStore.notificationTypes[jsonData.new_status]}"`)
                }
               break;
            case "offer to change status":
                setText(`Вам предложили возобновить занятия по "${jsonData.class_name}"`)
                break;
            case "communication change":
                setText(`Вам предложили поменять способ коммуникации занятия "${jsonData.class_name}"`)
                break;
        }
    }, [data])

    const clickHandler = () => {
        switch (data["Type"]) {
            case "lesson complete":
                history.push(`/messages/${notificationData.chat_user_id}/lesson-information?class_id=${notificationData.booking_id}`)
                break;
            case "class completed":
                history.push(`/messages/${notificationData.chat_user_id}/review?lessons_count=${notificationData.lesson_count}`)
                break;
            case "time change":
                history.push(`/messages/${notificationData.chat_user_id}/change-lessons-dates?id=${notificationData.ClassId}&im_receiver=${true}`)
                break;
            case "status change":
                switch (notificationData["new_status"]) {
                    case "consideration":
                        break;
                    case "planned":
                        break;
                    case "completed":
                        break;
                    case "canceled":
                        if (notificationData.old_status === 'planned')
                            history.push(`/messages/${notificationData.chat_user_id}/termination-lesson?is_mentor=${notificationData.is_mentor}`)
                        else
                            history.push(`/messages/${notificationData.chat_user_id}/rejected-lesson?is_mentor=${notificationData.is_mentor}`)
                        break;
                }
                break;
            case "offer to change status":
                history.push(`/messages/${notificationData.chat_user_id}/resume-lesson?id=${notificationData.class_id}&is_mentor=${false}`)
                break;
            case "communication change":
                history.push(`/messages/${notificationData.chat_user_id}/change-communication?class_id=${notificationData.class_id}&is_notification=${true}&active_item=${notificationData.new_communication_id}`)
                break;
        }
        if (!data.IsRead) {
            authStore.readNotification(data.ID)
        }

    }

    const deleteNotification = (e) => {
        e.stopPropagation()
        authStore.deleteNotification(data.ID)
    }

    return (
        <div className={s.notification_block__container} onClick={clickHandler}>
            <img src={img} className={s.notification_block__img} alt=""/>
            <div className={s.notification_block__info_container}>
                <div
                    className={s.notification_block__name}>{notificationData.first_name} {notificationData.second_name}</div>
                <div className={s.notification_block__text}>
                    {text}
                </div>
                <div className={s.notification_block__time}>{refactorDate}</div>
            </div>
            <img onClick={e => deleteNotification(e)} src={closeImg} className={s.notification_block__close} alt=""/>
        </div>
    );
};

export default observer(NotificationBlock);