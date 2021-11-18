import React from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/work.svg";
import ModalContainer from "../../../../../components/UI/ModalContainer/ModalContainer";

const WorkExperienceForm = () => {
    return (
        <div>
            <div className={`${s.form_container} ${s.com_container}`}>
                <div className={s.set_photo_display}>
                    <img src={default_img} alt=""/>
                    <div className={s.btn_container}>
                        <div className={s.btn}>Добавить</div>
                    </div>
                    <div className={s.description}>
                        Добавить новый опыт работы
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div className={s.education_title}>Мой опыт работы</div>
                    <div className={s.com_items}>
                        <div className={s.education_item}>
                            <div className={s.work_title}>2005 - 2010</div>
                            <div>ОАО Сбербанк России</div>
                            <div className={s.delete}>Удалить</div>
                        </div>
                        <div className={s.education_item}>
                            <div className={s.work_title}>2010 - 2020</div>
                            <div>Собственное ИП</div>
                            <div className={s.delete}>Удалить</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkExperienceForm;