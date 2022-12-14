import React, {useState} from 'react';
import s from '../../../styles/MessageBlock.module.css';
import close from '../../../../../static/img/delete.svg';
import {NavLink, useHistory, useParams} from 'react-router-dom';
import {API_URL} from '../../../../../api/api_setting';
import messagesStore from '../../../../../store/messagesStore';

const MessagesBlock = ({data, isActive, setShowRightSide, deleteBlock}) => {
    const history = useHistory()

    const onClickHandler = () => {
        messagesStore.clearReadMessages(data.ID);
        messagesStore.setCountMessage(
            messagesStore.countUnreadMessages - data.count_unread_messages
        );
        history.push(`/messages/${data.ID}`)
    };

    return (
        <a className={`${s.container} ${
            isActive ? s.active_container : ''
        }`} >
            <div
                className={s.content_container}
                onClick={() => onClickHandler()}
            >
                <img
                    src={`${API_URL}/public-api/user/profile-picture/${data.ProfilePicture}`}
                    className={s.profile}
                />
                <div className={s.info_and_notification}>
                    <div className={s.info_container}>
                        <div className={s.name}>
                            {data.FirstName} {data.SecondName}
                        </div>
                        <div className={s.time_and_notification}>
                            <div className={s.time}>
                                {data.lastMessageDate}
                            </div>
                        </div>
                    </div>
                    <div className={s.notification}>
                        {data.count_unread_messages > 0 ? (
                            <div>{data.count_unread_messages}</div>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
                <img src={close} className={s.close} onClick={(e) => {
                    e.stopPropagation()
                    deleteBlock()
                    messagesStore.deleteChat(data.chat_id)
                }} alt=""/>
            </div>
        </a>
    );
};

export default MessagesBlock;
