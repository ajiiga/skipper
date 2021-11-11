import React from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/money.svg";
import mastercard from '../../../../../static/img/PrivateProfile/mastercard.svg'

const PurseForm = () => {
    return (
        <div className={s.form_container}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn}>Добавить</div>
                </div>
                <div className={s.description}>
                    Добавить новый способ оплаты
                </div>
            </div>
            <div className={s.com_items}>
                <div className={s.com_block}>
                    <div className={s.block_title}>Кредитная карта</div>
                    <div className={s.credit_card}>
                        <img src={mastercard} alt=""/>
                        <div className={s.credit_card_info}>
                            <div>**** **** **** 3197</div>
                            <div>11 / 2022</div>
                        </div>
                    </div>
                    <div className={s.delete}>Удалить</div>
                </div>
            </div>
        </div>
    );
};

export default PurseForm;