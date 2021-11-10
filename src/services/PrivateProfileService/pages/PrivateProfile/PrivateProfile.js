import React from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../../styles/PrivateProfileService.module.css'
import EditForm from "./EditForm/EditForm";

const PrivateProfile = () => {
    return (
        <div className={s.container}>
            <MiniNavBar child={'Личный профиль'}/>
            <div className={s.content}>
                <div className={s.title}>Общая информация</div>
                <EditForm />
            </div>
        </div>
    );
};

export default PrivateProfile;