import React, {useState} from 'react';
import s from '../../styles/AuthService.module.css'
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import EmailForm from "./EmailForm/EmailForm";
import skype from '../../../../static/img/Login/skype.png'
import img from '../../../../static/img/log_reg.svg'
import TelForm from "./TelForm/TelForm";

const Login = () => {
    let [emailMode, setMode] = useState(true)

    return (
        <div className={s.container}>
            <AuthContainer>
                <div className={s.change_display}>
                    <div
                        className={`${s.email} ${!emailMode && s.deactivate}`}
                        onClick={() => setMode(true)}
                        style={!emailMode? {'border-radius': '8px 0px'} : {}}
                    >Email</div>
                    <div
                        className={`${s.email} ${emailMode && s.deactivate}`}
                        onClick={() => setMode(false)}
                        style={emailMode? {'border-radius': '0px 8px'} : {}}
                    >
                        Номер телефона
                    </div>
                </div>

                <div className={s.form_container}>
                    {emailMode ? (
                        <EmailForm />
                    ) : (
                        <TelForm />
                    )}
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

            <img className={s.main_img} src={img} alt=""/>

        </div>
    );
};

export default Login;