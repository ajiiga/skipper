import React from 'react';
import s from './ChatButton.module.css'
import {Link} from "react-router-dom";
import img from '../../../static/img/Search/message_icon.svg'

const ChatButton = ({id}) => {
    return (
        <Link to={`/messages/${id}`}>
            <div className={s.chat_btn}>
                <div className={s.flex_container}>
                    <img className={s.icon} src={img} alt=""/>
                    <div>Сообщение</div>
                </div>
            </div>
        </Link>
    );
};

export default ChatButton;