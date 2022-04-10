import React from 'react';
import s from '../../../styles/MessageBlock.module.css'
import profile from '../../../../../static/img/profile.jfif'
import close from '../../../../../static/img/delete.svg'
import read from '../../../../../static/img/Messages/coolicon.svg'
import sent from '../../../../../static/img/Messages/coolicon_2.svg'
import {NavLink} from "react-router-dom";
import {API_URL} from "../../../../../api/api_setting";

const MessagesBlock = ({status, data}) => {
    return (
        <NavLink to={`/messages/${data.ID}`}>
            <div className={s.container}>
                <div className={s.content_container}>
                    <img src={`${API_URL}/public-api/user/profile-picture/${data.ProfilePicture}`} className={s.profile}/>
                    <div className={s.info_and_notification}>
                        <div className={s.info_container}>
                            <div className={s.name}>{data.FirstName} {data.SecondName}</div>
                            <div className={s.time_and_notification}>
                                <div className={s.time}>19:46</div>
                            </div>
                        </div>
                        <div className={s.notification}>
                            {status.count > 0 ? <div>
                                {status.count}
                            </div> : ''}
                        </div>
                    </div>
                    <img src={close} className={s.close} alt=""/>

                </div>
            </div>
            <div className={s.border}/>
        </NavLink>
    );
};

export default MessagesBlock;