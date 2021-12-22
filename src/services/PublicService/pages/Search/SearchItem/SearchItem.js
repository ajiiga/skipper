import React from 'react';
import s from './SearchItem.module.css'
import profile_img from '../../../../../static/img/profile-img.jpg'
import black_heart from '../../../../../static/img/Search/black_heart.svg'
import SearchService from "./SearchService/SearchService";
import FollowButton from "../../../../../components/UI/FollowButton/FollowButton";
import ChatButton from "../../../../../components/UI/ChatButton/ChatButton";
import Rating from "../../../../../components/UI/Rating/Rating";

const SearchItem = () => {
    return (
        <div className={s.container}>
            <div className={s.profile}>
                <img src={profile_img} alt="" className={s.profile_img}/>
                <div className={s.profile_info}>
                    <div className={s.title}>Сергей Веснушкин</div>
                    <div className={s.status}>Senior react developer</div>
                    <div className={s.description}>
                        Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве.
                        Готов помочь с вопросами составления отчетности и прочих...
                    </div>
                </div>
                <div className={s.display}>
                    <Rating num={4.7} />
                    <div className={s.price_display}>
                        <div className={s.price}>$17</div>
                        <div className={s.price_description}>средняя цена занятия</div>
                    </div>
                   <FollowButton />
                    <ChatButton />
                </div>
            </div>
            <div className={s.services}>
                <SearchService name={'React'} tags={['React']} />
            </div>
        </div>
    );
};

export default SearchItem;