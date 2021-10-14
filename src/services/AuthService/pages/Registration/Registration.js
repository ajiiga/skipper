import React from 'react';
import s from '../../styles/AuthService.module.css'
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import img from "../../../../static/img/log_reg.svg";
import skype from "../../../../static/img/Login/skype.png";
import RegistrationForm from "./RegistrationForm/RegistrationForm";

const Registration = () => {
    return (
        <div className={s.container}>
            <AuthContainer>
                <div className={s.one_display}>
                    Регистрация
                </div>

                <div className={s.form_container}>
                        <RegistrationForm />
                    <div className={s.networks}>
                        <img src={skype} className={s.network} alt=""/>
                        <img src={skype} className={s.network} alt=""/>
                        <img src={skype} className={s.network} alt=""/>
                    </div>
                    <p className={s.description}>
                        Входя в систему или регистрируясь, вы соглашаетесь с <u>политикой безопасности</u> и <u>правилами поведения</u> Skipper
                    </p>
                </div>
            </AuthContainer>

            <img src={img} alt=""/>

        </div>
    );
};

export default Registration;