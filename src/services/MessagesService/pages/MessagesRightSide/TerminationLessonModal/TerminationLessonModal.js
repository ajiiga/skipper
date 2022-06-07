import React from "react";
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import img from '../../../../../static/img/Messages/solid_III.svg'
import s from "../../../styles/MessageModals.module.css";
import useQuery from "../../../../../CustomHooks/useQuery";

const TerminationLessonModal = ({ id, title }) => {

    let query = useQuery()

    let isMentor = query.get("is_mentor")

  return (
    <MessageModalContainer id={id} title={title}>
      <div className={s.terminate_lesson_container}>
        <div className={s.terminate_lesson_title}>
          Увы, но второй пользователь решил {title === "Отклонение занятий"? 'отклонить' : 'прекратить'} занятия
        </div>
         <img src={img} alt=""/>
        {false? <div className={s.resume_lesson_content}>
          Оставшиеся денежные средства в скором времени вернутся на Ваш счет
        </div> : <div style={{height: '46px'}} />}
      </div>
    </MessageModalContainer>
  );
};

export default TerminationLessonModal;
