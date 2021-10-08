import React, {useState} from 'react';
import s from '../Login/Login.module.css'
import AuthContainer from "../../UI/AuthContainer/AuthContainer";
import EmailForm from "../Login/EmailForm/EmailForm";
import skype from '../../../static/img/Login/skype.png'
import img from '../../../static/img/log_reg.svg'
import {Route} from "react-router-dom";
import RegistrationForm from "../Registration/RegistrationForm/RegistrationForm";

const Login = () => {
    let [emailMode, setMode] = useState(true)

    return (
        <div className={s.container}>
            <AuthContainer>
                <Route path={'/login'}>
                    <div className={s.change_display}>
                        <div
                            className={`${s.email} ${!emailMode && s.deactivate}`}
                            onClick={() => setMode(true)}
                            style={!emailMode ? {'border-radius': '8px 0px'} : {}}
                        >Email
                        </div>
                        <div
                            className={`${s.email} ${emailMode && s.deactivate}`}
                            onClick={() => setMode(false)}
                            style={emailMode ? {'border-radius': '0px 8px'} : {}}
                        >
                            Номер телефона
                        </div>
                    </div>
                </Route>

                <Route path={'/registration'}>
                    <div className={s.one_display}>
                        Регистрация
                    </div>
                </Route>

                <div className={s.form_container}>
                    <Route path={'/login'}>
                        {emailMode ? (
                            <EmailForm/>
                        ) : (
                            <div>tel</div>
                        )}
                    </Route>
                    <Route path={'/registration'}>
                        <RegistrationForm/>
                    </Route>
                    <div className={s.networks}>
                        <img src={skype} className={s.network} alt=""/>
                        <img src={skype} className={s.network} alt=""/>
                        <img src={skype} className={s.network} alt=""/>
                    </div>
                    <p className={s.description}>
                        Входя в систему или регистрируясь, вы соглашаетесь с <u>политикой безопасности</u> и <u>правилами
                        поведения</u> Skipper
                    </p>
                </div>
            </AuthContainer>

            <img src={img} alt=""/>

        </div>
    );
};

export default Login;