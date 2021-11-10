import React from 'react';
import s from '../../../styles/PrivateProfileService.module.css'
import default_img from '../../../../../static/img/PrivateProfile/profile.svg'

const EditForm = () => {
    return (
        <div className={s.form_container}>
            <div className={s.set_photo_display}>
                <img src={default_img} alt=""/>
                <div className={s.btn_container}>
                    <div className={s.btn}>Загрузить</div>
                </div>
                <div className={s.description}>
                    Размер фотографии не должен превышать 20Мб
                </div>
            </div>


            <div className={s.form}>

                <div className={s.block}>

                </div>

            </div>
        </div>
    );
};

export default EditForm;