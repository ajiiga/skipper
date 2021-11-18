import React from 'react';
import s from "../../../styles/PrivateProfileService.module.css";
import default_img from "../../../../../static/img/PrivateProfile/achievements.svg";

const AchievementsForm = () => {
    return (
        <div>
            <div className={`${s.form_container} ${s.com_container}`}>
                <div className={s.set_photo_display}>
                    <img src={default_img} alt=""/>
                    <div className={s.btn_container}>
                        <div className={s.btn}>Добавить</div>
                    </div>
                    <div className={s.description}>
                        Добавить новые достижения
                    </div>
                </div>
                <div style={{width: '100%'}}>
                    <div className={s.education_title}>Мой достижения</div>
                    <div>
                        <div className={s.achievement_item}>
                            <div className={s.achievement_title}>Место №3 во всероссийском конкурсе “Алло, мы ищем таланты”</div>
                            <div className={s.delete}>Удалить</div>
                        </div>
                        <div className={s.achievement_item}>
                            <div className={s.achievement_title}>Место №3 во всероссийском конкурсе “Алло, мы ищем таланты”</div>
                            <div className={s.delete}>Удалить</div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementsForm;