import React from 'react';
import s from '../../styles/MessagesRightSide.module.css'
import img from '../../../../static/img/Messages/empty_messages.svg'

const MessagesRightSideEmpty = ({emptyDialogs}) => {
    return (
        <div className={`${s.container} ${s.container_empty_messages}`}>
            <div className={s.empty_messages_block}>
                <img src={img} alt=""/>
                {!emptyDialogs ? <div>Выберите диалог</div> :
                    <div>
                        <div>У вас нет диалогов</div>
                        <p className={s.empty_message_subtitle}>Напишите кому-нибудь в личные сообщения.<br/>Диалоги и история сообщений появятся здесь.</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default MessagesRightSideEmpty;