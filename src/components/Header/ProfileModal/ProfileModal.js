import React, {useEffect} from 'react';
import s from './ProfileModal.module.css'
import authStore from "../../../store/authStore";
import {NavLink} from "react-router-dom";

const ProfileModal = ({open, setOpen}) => {
    let closeModal = () => setOpen(false)
    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
            setOpen(false)
        }
    }, [])
    return (
        <div className={`${s.container} ${open && s.show}`}>
            <NavLink to={'/my-profile'}><div className={s.block}>Личный кабинет</div></NavLink>
            <div className={s.block}>Техническая поддержка</div>
            <div className={`${s.block} ${s.exit}`} onClick={() => authStore.logout()}>Выйти</div>
        </div>
    );
};

export default ProfileModal;