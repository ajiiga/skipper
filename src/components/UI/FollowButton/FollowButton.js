import React, {useState} from 'react';
import s from "./FollowButton.module.css"
import black_heart from "../../../static/img/Search/black_heart.svg";
import full_heart from "../../../static/img/Search/full_heart.svg"
import myClassesStore from "../../../store/myClassesStore";
import authStore from "../../../store/authStore";

const FollowButton = ({user_id, status, isFavorite}) => {
    let [favorite, setFavorite] = useState(isFavorite)
    return (
        <div className={s.follow_btn} onClick={() => {
            if (authStore.user.id !== user_id) {
                myClassesStore.addFavorite(user_id, status)
                setFavorite(!favorite)
            }
        }}>
            <img src={favorite? full_heart : black_heart} className={s.heart} alt=""/>
            В избранное
        </div>
    );
};

export default FollowButton;