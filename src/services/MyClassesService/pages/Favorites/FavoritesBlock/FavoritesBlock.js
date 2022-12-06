import React from 'react';
import s from '../../../styles/MyClasses.module.css'
import img from '../../../../../static/img/profile.jfif'
import {Link} from "react-router-dom";
import {API_URL} from "../../../../../api/api_setting";
import myClassesStore from "../../../../../store/myClassesStore";
import messageIcon from '../../../../../static/img/Search/message_icon.svg'

const FavoritesBlock = ({data, isMentor, deleteBlock }) => {

    const deleteFavorite = () => {
        myClassesStore.deleteFavorite(data.id, isMentor ? 'mentor' : 'menti').then(() => {
            deleteBlock()
        })
    }

    return (
        <div className={s.block_container}>
            <div className={s.left_side}>
                <img src={`${API_URL}/public-api/user/profile-picture/${data.profilePicture}`} className={s.icon} alt=""/>
                <div className={s.info_block}>
                    <div className={`${s.title_container} ${!data.specialization ? s.title_empty_container : ''}`}>
                        <div className={s.info_block__title}>{data.FirstName} {data.SecondName}</div>
                        <div className={s.info_block__subtitle}>{data.specialization}</div>
                    </div>
                    <div className={s.info}>
                        {data.description}
                    </div>
                </div>
            </div>

            <div className={s.profile_chat}>
                <Link to={`/${isMentor ? 'mentor' : 'mentee'}-profile/${data.id}`}>
                    <div className={s.profile_btn}>
                        Профиль
                    </div>
                </Link>
                <Link to={`/messages/${data.id}`}>
                    <div style={{display: 'flex', justifyContent: 'center'}} className={s.chat_btn}>
                        <img src={messageIcon} alt="" style={{ marginRight: '10px'}}/>
                        <div>Сообщение</div>
                    </div>
                </Link>

            </div>
            <div className={s.delete_btn_container}>
                <button onClick={() => deleteFavorite()} className={s.delete_btn}>Удалить</button>
            </div>
        </div>
    );
};

export default FavoritesBlock;