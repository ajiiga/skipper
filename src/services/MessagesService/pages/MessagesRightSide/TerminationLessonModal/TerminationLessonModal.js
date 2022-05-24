import React from "react";
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
// import img from '../../../../../static/img/Messages/solid_III.svg'
import s from "../../../styles/MessageModals.module.css";

const TerminationLessonModal = ({ id }) => {
  return (
    <MessageModalContainer id={id} title={"Прекращение занятий"}>
      <div className={s.terminate_lesson_container}>
        <div className={s.terminate_lesson_title}>
          Увы, но второй пользователь решил прекратить занятия
        </div>
        {/* <img src={img} alt=""/> */}
        <div className={s.resume_lesson_content}>
          Оставшиеся денежные средства в скором времени вернутся на Ваш счет
        </div>
      </div>
    </MessageModalContainer>
  );
};

export default TerminationLessonModal;
