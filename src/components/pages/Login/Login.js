import React, {useState} from 'react';
import s from './Login.module.css'
import AuthContainer from "../../UI/AuthContainer/AuthContainer";
import EmailForm from "./EmailForm/EmailForm";

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
                        <div>tel</div>
                    )}
                </div>

            </AuthContainer>
        </div>
    );
};

export default Login;