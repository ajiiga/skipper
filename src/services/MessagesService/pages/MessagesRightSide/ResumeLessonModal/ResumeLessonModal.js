import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from "../../../styles/MessageModals.module.css";

const ResumeLessonModal = ({id}) => {
    let [showContent, setShowContent] = useState(false)
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