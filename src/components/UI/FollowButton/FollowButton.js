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
                if (favorite) {
                    myClassesStore.deleteFavorite(user_id, status)
                } else {
                    myClassesStore.addFavorite(user_id, status)
                }
                setFavorite(!favorite)
            }
        }}>
            <div className={s.flex_container}>
                <img src={favorite ? full_heart : black_heart} className={s.heart} alt=""/>
                <div>В избранное</div>
            </div>
        </div>
    );
};

export default FollowButton;