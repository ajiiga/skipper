import React, {useEffect} from 'react';
import s from './ProfileModal.module.css'
import authStore from "../../../store/authStore";
import {NavLink} from "react-router-dom";
import {motion} from 'framer-motion'

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
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.25
            }}
            exit={{
                opacity: 0,
                transition: { duration: 0.25 }
            }}
            className={`${s.container}`}>
            <NavLink to={'/my-profile'}>
                <div className={s.block}>Личный кабинет</div>
            </NavLink>
            <div className={`${s.block} ${s.exit}`} onClick={() => authStore.logout()}>Выйти</div>
        </motion.div>
    );
};

export default ProfileModal;