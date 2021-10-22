import React from 'react';
import s from "../../styles/AuthService.module.css";
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import img from "../../../../static/img/mentor_log_reg.svg";
import skype from "../../../../static/img/Login/skype.png";
import MentorRegistrationForm from "./MentorRegistrationForm/MentorRegistrationForm";

const MentorRegistration = () => {
    return (
        <div className={s.container}>
            <AuthContainer>
                <div className={s.one_display}>
                    Регистрация ментора
                </div>

                <div className={s.form_container}>
                    <MentorRegistrationForm />
                    <p className={s.description}>
                        Входя в систему или регистрируясь, вы соглашаетесь с <u>политикой безопасности</u> и <u>правилами поведения</u> Skipper
                    </p>
                </div>
            </AuthContainer>

            <img className={s.main_img} src={img} alt=""/>

        </div>
    );
};

export default MentorRegistration;