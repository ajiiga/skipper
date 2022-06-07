import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from '../../../styles/MessageModals.module.css'
import useQuery from "../../../../../CustomHooks/useQuery";
import {useHistory} from 'react-router-dom'
import myClassesStore from "../../../../../store/myClassesStore";
const StopLessonModal = ({id, title}) => {

    let [showContent, setShowContent] = useState(false)

    let query = useQuery()

    let history = useHistory()

    const closeModal = () => {
        history.push(`/messages/${id}`)
    }

    const handleClick = () => {
        myClassesStore.changeStatusClass(parseInt(query.get("id")), 'canceled').then(r => closeModal())
    }

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
                            <button onClick={handleClick} className={s.submit_btn}>Отправить</button>
                        </div>
                    </>
                )}
        </MessageModalContainer>
    );
};

export default StopLessonModal;