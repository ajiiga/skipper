import React from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/education.svg";
import certificate from "../../../../../static/img/PrivateProfile/certif.png";

const EducationForm = () => {
    return (
        <div className={s.form_container}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn}>Добавить</div>
                </div>
                <div className={s.description}>
                    Добавить новую информацию об образовании
                </div>
            </div>
            <div style={{width: '100%'}}>
                <div className={s.education_title}>Мое образование</div>
                <div className={s.education_items}>
                    <div className={s.education_item}>
                    <span className={s.education_name_title}>
                        2001 - 2005 <br/>
                        Магистр, Уральский Юридический Институт
                    </span>

                        <img src={certificate} alt=""/>
                        <div className={s.delete}>Удалить</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationForm;