import React, {useState} from 'react';
import s from './../../../styles/MessageModals.module.css'
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import messagesStore from "../../../../../store/messagesStore";
import authStore from "../../../../../store/authStore";
import {useHistory} from "react-router-dom";
import useQuery from "../../../../../CustomHooks/useQuery";
import StarsRating from "../../../../../components/UI/StarsRating/StarsRating";
import img from '../../../../../static/img/Messages/picture_after_review.svg'

const SendReviewModal = ({id}) => {

    let [textReview, setTextReview] = useState('')
    let [isAnonymous, setIsAnonymous] = useState(false)
    let [selectedStar, setSelected] = useState(undefined)
    let [showPicture, setShowPicture] = useState(false)

    const history = useHistory()
    const query = useQuery()


    const closeModal = () => {
        history.push(`/messages/${id}`)
    }

    const sendReview = () => {
        if (textReview !== '' && selectedStar !== undefined) {
            messagesStore.sendReview(authStore.user.id, parseInt(id), textReview, selectedStar + 1, isAnonymous, parseInt(query.get("lessons_count")))
                .then(req => {
                    setShowPicture(true)
                })
        }
    }


    return (
        <MessageModalContainer id={id} title={`Отзыв о пользователе`}>
            {
                showPicture?
                    <div className={s.image_container}>
                        <img src={img} alt=""/>
                        <button className={s.submit_after_review_btn} onClick={closeModal}>
                            Спасибо за Ваш отзыв
                        </button>
                    </div>
                :
                <>
                <div className={s.title_container}>
                    <div className={s.title}>
                        Ваша оценка
                    </div>
                    <StarsRating setSelected={setSelected} selectedStar={selectedStar}/>
                </div>
                <textarea className={s.textarea} value={textReview} onChange={e => setTextReview(e.target.value)}/>
                <div className={s.checkbox_container}>
                    <input type="checkbox" id={'checkbox'} value={isAnonymous}
                           onChange={e => setIsAnonymous(e.target.checked)}/>
                    <label htmlFor={'checkbox'}>Анонимный отзыв</label>
                </div>
                <div className={s.submit_btn_container}>
                    <button className={s.submit_btn} onClick={() => sendReview()}>
                        Отправить отзыв
                    </button>
                </div>
            </>}
        </MessageModalContainer>
    );
};


export default SendReviewModal;
