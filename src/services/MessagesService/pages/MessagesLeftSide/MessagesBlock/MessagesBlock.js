import React, {useState} from 'react';
import s from '../../../styles/MessageBlock.module.css'
import profile from '../../../../../static/img/profile.jfif'
import close from '../../../../../static/img/delete.svg'
import read from '../../../../../static/img/Messages/coolicon.svg'
import sent from '../../../../../static/img/Messages/coolicon_2.svg'
import {NavLink, useParams} from "react-router-dom";
import {API_URL} from "../../../../../api/api_setting";
import messagesStore from "../../../../../store/messagesStore";

const MessagesBlock = ({data, isActive, changeCountUnreadMessages}) => {

    const onClickHandler = () => {
        changeCountUnreadMessages(data.ID, 0)
        messagesStore.clearReadMessages(data.ID)
    }

    return (
        <NavLink to={`/messages/${data.ID}`}>
            <div className={`${s.container} ${isActive ? s.active_container : ''}`} onClick={() => onClickHandler()}>
                <div className={s.content_container}>
                    <img src={`${API_URL}/public-api/user/profile-picture/${data.ProfilePicture}`} className={s.profile}/>
                    <div className={s.info_and_notification}>
                        <div className={s.info_container}>
                            <div className={s.name}>{data.FirstName} {data.SecondName}</div>
                            <div className={s.time_and_notification}>
                                <div className={s.time}>{data.lastMessageDate}</div>
                            </div>
                        </div>
                        <div className={s.notification}>
                            {data.count_unread_messages > 0 ? <div>
                                {data.count_unread_messages}
                            </div> : ''}
                        </div>
                    </div>
                    <img src={close} className={s.close} alt=""/>

                </div>
            </div>
            {/*<div className={s.border}/>*/}
        </NavLink>
    );
};

export default MessagesBlock;