import React from 'react';
import s from '../../styles/MyClasses.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import {Link} from "react-router-dom";

const MyClassesMentor = () => {
    return (
        <div className={s.container}>
            <MiniNavBar child={'Мои занятия'}/>
            <div className={s.content_container}>
                <div className={s.title_buttons}>
                    <div className={`${s.title_btn} ${s.active_title_btn}`}>На рассмотрении</div>
                    <div className={s.title_btn}>Запланированные</div>
                    <div className={s.title_btn}>Завершенные</div>
                    <div className={s.title_btn}>Отмененнные</div>
                    <Link to={'/edit-classes'} className={s.link_container}>
                        <div className={s.create_classes}>
                            Мои занятия +
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MyClassesMentor;