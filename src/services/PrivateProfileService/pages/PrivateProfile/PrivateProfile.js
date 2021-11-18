import React from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../../styles/PrivateProfileService.module.css'
import EditForm from "./EditForm/EditForm";
import CommunicationsForm from "./СommunicationsForm/СommunicationsForm";
import PurseForm from "./PurseForm/PurseForm";
import NotificationsForm from "./NotificationsForm/NotificationsForm";
import EducationForm from "./EducationForm/EducationForm";
import authStore from "../../../../store/authStore";
import Footer from "../../../../components/Footer/Footer";
import WorkExperienceForm from "./WorkExperienceForm/WorkExperienceForm";
import AchievementsForm from "./AchievementsForm/AchievementsForm";

const PrivateProfile = () => {
    return (
        <div className={s.container}>
            <MiniNavBar child={'Личный профиль'}/>
            <div className={s.content}>
                <div className={s.title}>Общая информация</div>
                <EditForm />
                <div className={s.title}>Способы коммуникации</div>
                <CommunicationsForm />
                <div className={s.title}>Кошелёк</div>
                <PurseForm />
                <div className={s.title}>Уведомления</div>
                <NotificationsForm />
                {authStore.user?.is_mentor && (
                    <>
                        <div className={s.title}>Образование</div>
                        <EducationForm />
                        <div className={s.title}>Опыт работы</div>
                        <WorkExperienceForm/>
                        <div className={s.title}>Мои достижения</div>
                        <AchievementsForm />
                    </>
                )
                }

            </div>
            <Footer />
        </div>
    );
};

export default PrivateProfile;