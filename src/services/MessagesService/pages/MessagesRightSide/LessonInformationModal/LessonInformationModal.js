import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from "../../../styles/MessageModals.module.css";
import StarsRating from "../../../../../components/UI/StarsRating/StarsRating";
import messagesStore from "../../../../../store/messagesStore";
import authStore from "../../../../../store/authStore";
import {useHistory} from "react-router-dom";
import useQuery from "../../../../../CustomHooks/useQuery";

const LessonInformationModal = ({id}) => {

    let [selectedStar, setSelected] = useState(undefined)

    const history = useHistory()
    const query = useQuery();


    const closeModal = () => {
        history.push(`/messages/${id}`)
    }

    const lessonDidNotClick = () => {
        let class_id = query.get("class_id")
        messagesStore.lessonDidNot(class_id).then(() => closeModal());
    }

    const submitHandler = () => {
        if (selectedStar !== undefined)
            messagesStore.sendReview(authStore.user.id, parseInt(id), '', selectedStar + 1, true).then(response => closeModal())
    }

    return (
        <MessageModalContainer id={id} title={'Информация по занятию'}>
            <div className={s.lesson_information_container}>
                <div className={s.title_container}>
                    <div className={s.title}>
                        Как прошло ваше занятие
                    </div>
                    <StarsRating setSelected={setSelected} selectedStar={selectedStar}/>
                </div>
                <button className={s.submit_btn} style={{marginTop: '0px'}} onClick={submitHandler}>
                    Отправить
                </button>
                <button className={s.second_submit_btn} onClick={lessonDidNotClick}>
                    Занятие не состоялость
                </button>


            </div>
        </MessageModalContainer>
    );
};

export default LessonInformationModal;