import React, {useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import s from "../../../styles/MessageModals.module.css";
import StarsRating from "../../../../../components/UI/StarsRating/StarsRating";

const LessonInformationModal = ({id}) => {

    let [setSelected, selectedStar] = useState(undefined)

    return (
        <MessageModalContainer id={id} title={'Информация по занятию'}>
            <div className={s.lesson_information_container}>
                <div className={s.title_container}>
                    <div className={s.title}>
                        Как прошло ваше занятие
                    </div>
                    <StarsRating setSelected={setSelected} selectedStar={selectedStar}/>
                </div>
                <button className={s.submit_btn} style={{marginTop: '0px'}}>
                    Отправить
                </button>
                <button className={s.second_submit_btn}>
                    Занятие не состоялость
                </button>


            </div>
        </MessageModalContainer>
    );
};

export default LessonInformationModal;