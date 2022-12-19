import React, {useState} from 'react';
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import s from "../../styles/AuthService.module.css";
import EmailForm from "../Login/EmailForm/EmailForm";
import TelForm from "../Login/TelForm/TelForm";
import img from "../../../../static/img/log_reg.svg";
import Footer from "../../../../components/Footer/Footer";
import TextInput from "../../../../components/UI/TextInput/TextInput";
import Button from "../../../../components/UI/Button/Button";
import ModalContainer from "../../../../components/UI/ModalContainer/ModalContainer";
import {useHistory} from "react-router-dom";
import authStore from "../../../../store/authStore";

const PasswordRecovery = () => {
    let [emailMode, setMode] = useState(true);
    let [isFetching, setIsFetching] = useState(false);
    let [login, setLogin] = useState('')
    const history = useHistory()

    let [showModal, setShowModal] = useState(false)

    return (
        <>
            <div className={`${s.container} ${s.container_recovery_password}`}>
                <AuthContainer>
                    <div className={s.change_display}>
                        <div
                            className={`${s.email} ${!emailMode && s.deactivate}`}
                            onClick={() => setMode(true)}
                            style={!emailMode ? {'border-radius': '8px 0px'} : {}}
                        >
                            Email
                        </div>
                        <div
                            className={`${s.email} ${emailMode && s.deactivate}`}
                            onClick={() => setMode(false)}
                            style={emailMode ? {'border-radius': '0px 8px'} : {}}
                        >
                            Номер телефона
                        </div>
                    </div>

                    <div style={{padding: '30px'}}>
                        <div style={{marginBottom: '10px'}}>{emailMode ? 'Введите адрес эл.почты для смены пароля' : 'Введите телефонный номер для смены пароля'}</div>
                        <input className={s.input} onChange={(e) => setLogin(e.currentTarget.value)} type="text"/>
                        <Button title={'Далее'} onClick={() => {
                            if (login) {
                                authStore.resetPassword(login).then(() => {
                                    setShowModal(true)
                                })
                            }
                        }} uppercase={false}/>
                    </div>


                </AuthContainer>

                <Footer/>
            </div>
            <ModalContainer title={'Восстановление пароля'} setActive={setShowModal} active={showModal}>
                <div style={{width: '570px', margin: 'auto'}}>
                    <div style={{textAlign: "center", margin: '30px 0'}}>
                        Мы отправили ссылку для восстановления пароля на вашу почту. Перейдите по ссылке в письме, чтобы
                        изменить пароль.
                    </div>
                    <Button title={'Готово'} onClick={() => {
                        history.push('/login')
                    }} uppercase={false}/>
                </div>
            </ModalContainer>
        </>
    );
};

export default PasswordRecovery;