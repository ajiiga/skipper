import React from 'react';
import s from './SearchItem.module.css'
import profile_img from '../../../../../static/img/profile-img.jpg'
import black_heart from '../../../../../static/img/Search/black_heart.svg'
import SearchService from "./SearchService/SearchService";

const SearchItem = () => {
    return (
        <div className={s.container}>
            <div className={s.profile}>
                <img src={profile_img} alt="" className={s.profile_img}/>
                <div className={s.profile_info}>
                    <div className={s.title}>Сергей</div>
                    <div className={s.status}>Senior react developer</div>
                    <div className={s.description}>
                        Более 10 лет занимаюсь налогами, откатами и прочими бухгалтерскими штучками на производстве.
                        Готов помочь с вопросами составления отчетности и прочих...
                    </div>
                </div>
                <div className={s.display}>
                    <div className={s.rating}>4.7</div>
                    <div className={s.price_display}>
                        <div className={s.price}>$17</div>
                        <div className={s.price_description}>средняя цена занятия</div>
                    </div>
                    <div className={s.follow_btn}>
                        <img src={black_heart} className={s.heart} alt=""/>
                        В избранное
                    </div>
                    <div className={s.chat_btn}>
                        Чат
                    </div>
                </div>
            </div>
            <div className={s.services}>
                <SearchService />
            </div>
        </div>
    );
};

export default SearchItem;