import React, {useState} from 'react';
import s from './../../../styles/MessageModals.module.css'
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import messagesStore from "../../../../../store/messagesStore";
import authStore from "../../../../../store/authStore";

const SendReviewModal = ({id, title}) => {

    let [textReview, setTextReview] = useState('')
    let [isAnonymous, setIsAnonymous] = useState(false)

    const sendReview = () => {
        messagesStore.sendReview(authStore.user.id, parseInt(id), textReview, 5, isAnonymous, 3)
    }

    return (
        <MessageModalContainer id={id} title={title}>
            <div className={s.title}>
                Ваша оценка
            </div>
            <textarea className={s.textarea} value={textReview} onChange={e => setTextReview(e.target.value)}/>
            <div className={s.checkbox_container}>
                <input type="checkbox" id={'checkbox'} value={isAnonymous} onChange={e => setIsAnonymous(e.target.checked)}/>
                <label htmlFor={'checkbox'}>Анонимный отзыв</label>
            </div>
            <div className={s.submit_btn_container}>
                <button className={s.submit_btn} onClick={() => sendReview()}>
                    Отправить отзыв
                </button>
            </div>
        </MessageModalContainer>
    );
};


export default SendReviewModal;
