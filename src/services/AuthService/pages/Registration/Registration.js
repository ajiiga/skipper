import React, {useState} from 'react';
import s from '../../styles/AuthService.module.css'
import AuthContainer from "../../../../components/UI/AuthContainer/AuthContainer";
import img from "../../../../static/img/log_reg.svg";
import skype from "../../../../static/img/Login/skype.png";
import vk from '../../../../static/img/messenger_icons/vk.png'
import fb from '../../../../static/img/messenger_icons/fb.png'
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
                        <div className={s.networks}>
                            <img src={skype} className={s.network} alt=""/>
                            <img src={vk} className={s.network} alt=""/>
                            <img src={fb} className={s.network} alt=""/>
                        </div>
                        <p className={s.description}>
                            Входя в систему или регистрируясь, вы соглашаетесь с <u>политикой безопасности</u> и <u>правилами
                            поведения</u> Skipper
                        </p>
                    </div>
                </AuthContainer>

                <img className={s.main_img} src={img} alt=""/>

            </div>
            <Footer/>
        </>
    );
};

export default Registration;