import React from 'react';
import s from './ChatButton.module.css'
import {Link} from "react-router-dom";

const ChatButton = ({id}) => {
    return (
        <Link to={`messages/${id}`}>
            <div className={s.chat_btn}>
                Чат
            </div>
        </Link>
    );
};

export default ChatButton;