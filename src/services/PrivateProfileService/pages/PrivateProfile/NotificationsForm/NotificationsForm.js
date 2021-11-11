import React from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/notifications.svg";

const NotificationsForm = () => {
    return (
        <>
            <div className={s.form_container}>
                <div className={s.set_photo_display}>
                    <img src={default_img} alt=""/>
                </div>
                <div className={s.notification_tel_phone}>
                    <div className={s.notification_block}>
                        <div className={s.notification_title}>Email</div>
                        <div className={s.notification_checkboxs}>
                            <div className={s.notification_checkbox}>
                                <input type="checkbox"/>
                                <label htmlFor=""> О начале занятий</label>
                            </div>
                            <div className={s.notification_checkbox}>
                                <input type="checkbox"/>
                                <label htmlFor=""> Об оплате</label>
                            </div>
                            <div className={s.notification_checkbox}>
                                <input type="checkbox"/>
                                <label htmlFor=""> О новых отзывах </label>
                            </div>
                        </div>
                    </div>
                    <div className={s.notification_block}>
                        <div className={s.notification_title}>Телефон</div>
                        <div className={s.notification_checkboxs}>
                            <div className={s.notification_checkbox}>
                                <input type="checkbox"/>
                                <label htmlFor=""> О начале занятий</label>
                            </div>
                            <div className={s.notification_checkbox}>
                                <input type="checkbox"/>
                                <label htmlFor=""> Об оплате</label>
                            </div>
                            <div className={s.notification_checkbox}>
                                <input type="checkbox"/>
                                <label htmlFor=""> О новых отзывах </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationsForm;