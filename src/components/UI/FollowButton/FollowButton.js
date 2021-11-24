import React from 'react';
import s from "./FollowButton.module.css"
import black_heart from "../../../static/img/Search/black_heart.svg";

const FollowButton = () => {
    return (
        <div className={s.follow_btn}>
            <img src={black_heart} className={s.heart} alt=""/>
            В избранное
        </div>
    );
};

export default FollowButton;