import React, {useState} from 'react';
import s from './Reviews.module.css'
import img from '../../../static/img/PrivateProfile/profile.svg'

const Reviews = () => {
    let arr = [
        {name: 'Азамат Имаев', count: 1, text: 'Сергей действительно разбирается в своей области. Всем рекомендую и обязательно схожу на его следующие занятия'},
        {name: 'Азамат Имаев', count: 2, text: 'Сергей действительно разбирается в своей области. Всем рекомендую и обязательно схожу на его следующие занятия'},
        {name: 'Азамат Имаев', count: 3, text: 'Сергей действительно разбирается в своей области. Всем рекомендую и обязательно схожу на его следующие занятия'},
        {name: 'Азамат Имаев', count: 4, text: 'Сергей действительно разбирается в своей области. Всем рекомендую и обязательно схожу на его следующие занятия'},
        {name: 'Азамат Имаев', count: 5, text: 'Сергей действительно разбирается в своей области. Всем рекомендую и обязательно схожу на его следующие занятия'},

    ]

    let [reviews, setReviews] = useState(arr.slice(0,3))
    return (
        <div className={s.container}>
            <div className={s.review_blocks}>
                {reviews.map(x => <ReviewBlock name={x.name} count={x.count} text={x.text} />)}
            </div>
            <div className={s.show_all_reviews} onClick={() => {
                if (reviews.length === 3) {
                    setReviews(arr)
                }
                else
                    setReviews(arr.slice(0, 3))
            }}>
                {reviews.length === 3 ? 'Смотреть все отзывы' : 'Скрыть отзывы'}
            </div>
        </div>
    );
};

export default Reviews;


const ReviewBlock = ({name, count, text}) => {
    return (
        <div className={s.review_block}>
            <div className={s.title_display}>
                <img src={img} className={s.profile_img} alt=""/>
                <div className={s.name_count}>
                    <div className={s.name}>{name}</div>
                    <div className={s.count}>{count} урока</div>
                </div>
            </div>
            <div className={s.text}>
                {text}
            </div>
        </div>
    )
}