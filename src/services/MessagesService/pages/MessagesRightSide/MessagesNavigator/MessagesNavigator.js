import React from 'react';
import navigator from "../../../../../static/img/Messages/navigator.svg";
import s from "../../../styles/MessagesRightSide.module.css";
import set_review from "../../../../../static/img/Messages/set_review.svg";
import {observer} from "mobx-react-lite";
import messagesStore from "../../../../../store/messagesStore";
import authStore from "../../../../../store/authStore";
import {useParams, useHistory} from 'react-router-dom'
const MessagesNavigator = () => {

    let params = useParams();
    let history = useHistory()

    const clickHandler = () => {
        let data = authStore.notifications.find(n => {
            return !n.IsRead && JSON.parse(n.Data).chat_user_id == params.id
        })

        let notificationData = JSON.parse(data.Data)

        switch (data["Type"]) {
            case "lesson complete":
                history.push(`/messages/${notificationData.chat_user_id}/lesson-information?class_id=${ClassId}`)
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


    let emptyNavigator = <img src={navigator} alt=""/>

    let navigatorWithNotification = (
        <div className={s.navigator_with_notification} onClick={clickHandler}>
            {emptyNavigator}
            <div className={s.navigator_notification}/>
        </div>
    )

    let setReview = (
        <img src={set_review} alt=""/>
    )



    if (authStore.notifications.filter(n => !n.IsRead && JSON.parse(n.Data).chat_user_id == params.id).length > 0)
        return navigatorWithNotification
    return (
        emptyNavigator
    )
}

export default observer(MessagesNavigator);