import React, {useState} from 'react';
import s from '../../styles/AuthService.module.css'
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import img from "../../../../static/img/log_reg.svg";
import RegistrationForm from "./RegistrationForm/RegistrationForm";
import Footer from "../../../../components/Footer/Footer";

const Registration = () => {

    let [isFetching, setIsFetching] = useState(false)


    return (
        <>
            <div className={s.container}>
                <AuthContainer>
                    <div className={s.one_display}>
                        Регистрация
                    </div>

                    <div className={s.form_container}>
                        <RegistrationForm isFetching={isFetching} setIsFetching={setIsFetching}/>
                    </div>
                </AuthContainer>

                <img className={s.main_img} src={img} alt=""/>

            </div>
            <Footer/>
        </>
    );
};

export default Registration;