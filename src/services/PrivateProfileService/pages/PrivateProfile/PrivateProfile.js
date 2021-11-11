import React from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../../styles/PrivateProfileService.module.css'
import EditForm from "./EditForm/EditForm";
import CommunicationsForm from "./СommunicationsForm/СommunicationsForm";
import PurseForm from "./PurseForm/PurseForm";
import NotificationsForm from "./NotificationsForm/NotificationsForm";

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
            </div>
        </div>
    );
};

export default PrivateProfile;