import React, { useState } from 'react';
import s from '../../styles/AuthService.module.css';
import AuthContainer from '../../../../components/UI/AuthContainer/AuthContainer';
import EmailForm from './EmailForm/EmailForm';
import img from '../../../../static/img/log_reg.svg';
import TelForm from './TelForm/TelForm';
import Footer from '../../../../components/Footer/Footer';

const Login = () => {
  let [emailMode, setMode] = useState(false);
  let [isFetching, setIsFetching] = useState(false);

  return (
    <div className={s.container}>
      <AuthContainer>
        <div className={s.change_display}>
          <div
            className={`${s.email} ${!emailMode && s.deactivate}`}
            onClick={() => setMode(true)}
            style={!emailMode ? { 'border-radius': '8px 0px' } : {}}
          >
            Email
          </div>
          <div
            className={`${s.email} ${emailMode && s.deactivate}`}
            onClick={() => setMode(false)}
            style={emailMode ? { 'border-radius': '0px 8px' } : {}}
          >
            Номер телефона
          </div>
        </div>

        <div className={s.form_container}>
          {emailMode ? (
            <EmailForm isFetching={isFetching} setIsFetching={setIsFetching} />
          ) : (
            <TelForm isFetching={isFetching} setIsFetching={setIsFetching} />
          )}
        </div>
      </AuthContainer>

      <img className={s.main_img} src={img} alt="" />
      <Footer />
    </div>
  );
};

export default Login;
