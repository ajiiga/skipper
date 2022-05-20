import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from "../../../styles/MessageModals.module.css";

const ResumeLessonModal = ({id, isMentor}) => {
    let [showContent, setShowContent] = useState(false)

    if (isMentor) {
        return (
            <MessageModalContainer id={id} title={'Возобновить занятия'}>
                <div className={s.mentor_resume_lesson__container}>
                    <button className={s.mentor_resume_lesson__show_title}>
                        Вам предложено продолжить занятие
                    </button>
                    <div className={s.mentor_resume_lesson__select_buttons_container}>
                        <button className={s.mentor_resume_lesson__submit_btn}>Принять</button>
                        <button className={s.mentor_resume_lesson__close_btn}>Отклонить</button>
                    </div>
                </div>
            </MessageModalContainer>
        )
    }

    return (
        <MessageModalContainer id={id} title={'Возобновить занятия'}>
            {!showContent ?
                <div className={s.show_content__container}>
                    <button className={s.show_content__btn} onClick={() => setShowContent(true)}>
                        Возобновить занятия
                    </button>
                </div>
                : (
                    <div className={s.resume_lesson_content}>
                        Как только менти будет согласен, Ваше занятие появится в разделе мои занятия
                    </div>
                )}
        </MessageModalContainer>
    );
};

export default ResumeLessonModal;