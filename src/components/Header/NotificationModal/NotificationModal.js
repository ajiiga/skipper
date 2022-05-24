import React, {useEffect} from 'react';
import s from './NotificationModal.module.css'
import NotificationBlock from "./NotificationBlock";
import {motion} from 'framer-motion'
import authStore from "../../../store/authStore";
import {observer} from "mobx-react-lite";

const NotificationModal = ({setOpen}) => {

    console.log(authStore.notifications)

    const closeModal = () => {
        setOpen(false)
    }

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
            className={s.container}>
            <div className={s.title}>
                Уведомление
            </div>
            <div className={s.header}/>
            {
                authStore.notifications.map(notification => <NotificationBlock data={notification} />)
            }
            <div className={s.footer}/>
        </motion.div>
    );
};

export default observer(NotificationModal);