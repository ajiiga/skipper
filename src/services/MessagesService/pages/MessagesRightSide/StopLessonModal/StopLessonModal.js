import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from '../../../styles/MessageModals.module.css'

const StopLessonModal = ({id, title}) => {
    let [showContent, setShowContent] = useState(false)
    return (
        <MessageModalContainer id={id} title={title}>
            {!showContent ?
                <div className={s.show_content__container}>
                    <button className={s.show_content__btn} onClick={() => setShowContent(true)}>
                        {title}
                    </button>
                </div>
                : (
                    <>
                    <textarea className={s.textarea} placeholder={'Расскажите нам что сподвигло Вас на такое решение'}>

                    </textarea>
                        <div className={s.submit_btn_container}>
                            <button className={s.submit_btn}>Отправить</button>
                        </div>
                    </>
                )}
        </MessageModalContainer>
    );
};

export default StopLessonModal;