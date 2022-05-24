import React from 'react';
import s from './NotificationModal.module.css'
import img from '../../../static/img/skipper_logo.svg'
import closeImg from '../../../static/img/delete.svg'
import messagesStore from "../../../store/messagesStore";
import {Link, useHistory} from 'react-router-dom'
import authStore from "../../../store/authStore";

const NotificationBlock = ({data}) => {

    let refactorDate = messagesStore.refactorDate(data.CreatedAt)
    let jsonData = JSON.parse(data.Data)

    let history = useHistory()

    const clickHandler = () => {
        history.push(`/messages/${jsonData.comment_recipient}/review?lessons_count=${5}`)
        authStore.deleteNotification(data.ID)
    }

    let isMentor = authStore.user.id === jsonData.mentor_id

    return (
            <div className={s.notification_block__container} onClick={clickHandler}>
                <img src={img} className={s.notification_block__img} alt=""/>
                <div className={s.notification_block__info_container}>
                    <div className={s.notification_block__name}>{jsonData.first_name} {jsonData.second_name}</div>
                    <div className={s.notification_block__text}>
                        Расскажите нам пожалуйста, как прошли ваши занятия по "{jsonData.class_data_name}". Это поможет нам стать лучше.
                    </div>
                    <div className={s.notification_block__time}>{refactorDate}</div>
                </div>
                <img src={closeImg} className={s.notification_block__close} alt=""/>
            </div>
    );
};

export default NotificationBlock;