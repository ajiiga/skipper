import React, {useState} from 'react';
import s from './Reviews.module.css'
import img from '../../../static/img/PrivateProfile/profile.svg'
import {API_URL} from "../../../api/api_setting";

const Reviews = ({n, allReviews}) => {

    let [reviews, setReviews] = useState(allReviews.slice(0,n))

    return (
        <div className={s.container}>
            <div className={s.review_blocks}>
                {reviews.map((review, index) => <ReviewBlock key={index} data={review} />)}
            </div>
            {allReviews.length > n && <div className={s.show_all_reviews} onClick={() => {
                if (reviews.length === n) {
                    setReviews(allReviews)
                } else
                    setReviews(allReviews.slice(0, n))
            }}>
                {reviews.length === n ? 'Смотреть все отзывы' : 'Скрыть отзывы'}
            </div>}
        </div>
    );
};

export default Reviews;


const ReviewBlock = ({data}) => {
    return (
        <div className={s.review_block}>
            <div className={s.title_display}>
                <img src={data.Anonymous ? img : `${API_URL}/public-api/user/profile-picture/${data.sender_profile_picture}`} className={s.profile_img} alt=""/>
                <div className={s.name_count}>
                    <div className={s.name}>{data.Anonymous? 'Анонимный пользователь' : `${data.sender_first_name} ${data.sender_second_name}`}</div>
                    <div className={s.count}>{data.Anonymous ? '' : `${data.LessonsCount} урока`}</div>
                </div>
            </div>
            <div className={s.text}>
                {data.Text}
            </div>
        </div>
    )
}