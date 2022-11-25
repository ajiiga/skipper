import React from 'react';
import s from '../../../styles/MyClasses.module.css'
import img from '../../../../../static/img/profile.jfif'
import ChatButton from "../../../../../components/UI/ChatButton/ChatButton";
import {Link} from "react-router-dom";


const FavoritesBlock = () => {
    return (
        <div className={s.block_container}>
            <div className={s.left_side}>
                <img src={img} className={s.icon} alt=""/>
                <div className={s.info_block}>
                    <div className={s.title_container}>
                        <div className={s.info_block__title}>Сергей Веснушкин</div>
                        <div className={s.info_block__subtitle}>Senior react developer</div>
                    </div>
                    <div className={s.info}>
                        Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве. Готов помочь с вопросами составления отчетности и прочих...
                    </div>
                </div>
            </div>

            <div className={s.profile_chat}>
                <Link to={`/mentor-profile/${1}`}>
                    <div className={s.profile_btn}>
                        Профиль
                    </div>
                </Link>
                <Link to={`/messages/${1}`}>
                    <div className={s.chat_btn}>
                        Чат
                    </div>
                </Link>
            </div>
            <div className={s.delete_btn_container}>
                <button className={s.delete_btn}>Удалить</button>
            </div>
        </div>
    );
};

export default FavoritesBlock;