import React from 'react';
import s from '../../../styles/MessageBlock.module.css'
import profile from '../../../../../static/img/profile.jfif'
import close from '../../../../../static/img/delete.svg'
import read from '../../../../../static/img/Messages/coolicon.svg'
import sent from '../../../../../static/img/Messages/coolicon_2.svg'

const MessagesBlock = ({status}) => {
    let statusCode = status?.code
    let notificationBlock = <div/>

    switch (statusCode) {
        case 0:
            notificationBlock = <img src={sent} className={s.notification_status} alt=""/>
            break;
        case 1:
            notificationBlock = <img src={read} className={s.notification_status} alt=""/>
            break;
        case 2:
            notificationBlock = <div className={s.notification}>{status.count}</div>
    }

    return (
        <>
            <div className={s.container}>
                <div className={s.content_container}>
                    <img src={profile} className={s.profile}/>
                    <div className={s.info_container}>
                        <div className={s.name}>Сергей Веснушкин</div>
                        <div className={s.time_and_notification}>
                            <div className={s.time}>19:46</div>
                            {notificationBlock}
                        </div>
                    </div>
                    <img src={close} className={s.close} alt=""/>

                </div>
            </div>
            <div className={s.border}/>
        </>
    );
};

export default MessagesBlock;