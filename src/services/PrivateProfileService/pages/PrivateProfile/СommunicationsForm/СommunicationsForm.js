import React, {useState} from 'react';
import s from '../../../styles/PrivateProfileService.module.css'
import default_img from "../../../../../static/img/PrivateProfile/communications.svg";
import ModalContainer from "../../../../../components/UI/ModalContainer/ModalContainer";
import {set} from "mobx";

const CommunicationsForm = () => {
    let [active, setActive] = useState(false)
    return (
        <div className={`${s.form_container} ${s.com_container}`}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn} onClick={() => setActive(true)}>Добавить</div>
                </div>
                <div className={s.description}>
                    Добавить новый способ связи
                </div>
            </div>

            <div className={s.com_items}>
                <div className={s.com_block}>
                    <div className={s.block_title}>Skype</div>
                    <input type="text" value={'SuperDarkLord2005'}/>
                    <div className={s.delete}>Удалить</div>
                </div>
                <div className={s.com_block}>
                    <div className={s.block_title}>Zoom</div>
                    <input type="text" value={'$uperD@rkL0rd2005'}/>
                    <div className={s.delete}>Удалить</div>
                </div>
            </div>
            <ModalContainer active={active} setActive={setActive}>

            </ModalContainer>
        </div>
    );
};

export default CommunicationsForm;