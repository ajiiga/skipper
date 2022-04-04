import React from 'react';
import s from '../../styles/MessagesRightSide.module.css'
import img from '../../../../static/img/Messages/empty_messages.svg'

const MessagesRightSideEmpty = () => {
    return (
        <div className={`${s.container} ${s.container_empty_messages}`}>
            <div className={s.empty_messages_block}>
                <img src={img} alt=""/>
                <div>Выберите чат</div>
            </div>
        </div>
    );
};

export default MessagesRightSideEmpty;