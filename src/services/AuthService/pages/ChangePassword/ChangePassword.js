import React, {useState} from 'react';
import s from '../../styles/AuthService.module.css'
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import Button from "../../../../components/UI/Button/Button";
import authStore from "../../../../store/authStore";
import useQuery from "../../../../CustomHooks/useQuery";
import ModalContainer from "../../../../components/UI/ModalContainer/ModalContainer";
import {useHistory} from "react-router-dom";

const ChangePassword = () => {
    let [newPassword, setNewPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('')

    let [showModal, setShowModal] = useState(false)

    const query = useQuery()
    const history = useHistory()

    return (
        <>
            <div style={{margin: '30px auto 0'}}>
                <div style={{
                    width: '484px',
                    background: '#ffffff',
                    boxShadow: '0px 2px 8px rgb(0 0 0 / 14%)',
                    borderRadius: '8px',
                    marginTop: '52px',
                    padding: '30px',
                    boxSizing: 'border-box',
                    margin: "100px auto"
                }}>
                    <div style={{textAlign: "center", fontWeight: 'bold'}}>ВОССТАНОВЛЕНИЕ ПАРОЛЯ</div>
                    <div style={{margin: '50px 0 10px 0'}}>Введите новый пароль</div>
                    <input type="password" placeholder={'Новый пароль'} value={newPassword}
                           onChange={e => setNewPassword(e.target.value)} className={s.input}/>
                    <input type="password" placeholder={'Подтвердите пароль'} value={confirmPassword}
                           onChange={e => setConfirmPassword(e.target.value)} className={s.input}/>
                    <div style={{marginTop: 'auto'}}>
                        <Button title={'Далее'} uppercase={false} onClick={() => {
                            if (newPassword === confirmPassword && newPassword) {
                                authStore.newPassword(newPassword, query.get('token')).then(() => {
                                    setShowModal(true)
                                })
                            }
                        }}/>
                    </div>

                </div>
            </div>
            <ModalContainer active={showModal} setActive={setShowModal} title={'Восстановление пароля'} onClose={() => history.push('/login')}>
                <div style={{width: '520px', margin: 'auto', textAlign: 'center'}}>
                    <div style={{margin: '35px 0'}}>Вы успешно изменили свой пароль.</div>
                    <div style={{marginBottom: '35px'}}>Теперь вы можете изспользовать новые данные для защиты учетной записи, чтобы войти в неё.</div>
                    <Button title={'Готово'} onClick={() => {
                        history.push('/login')
                    }}/>
                </div>
            </ModalContainer>
        </>
    );
};

export default ChangePassword;