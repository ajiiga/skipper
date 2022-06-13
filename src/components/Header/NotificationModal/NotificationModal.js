import React, { useEffect } from 'react';
import s from './NotificationModal.module.css';
import NotificationBlock from './NotificationBlock';
import { motion } from 'framer-motion';
import authStore from '../../../store/authStore';
import { observer } from 'mobx-react-lite';
import close_img from '../../../static/img/delete.svg';

const NotificationModal = ({ setOpen }) => {
  console.log(authStore.notifications);

  const closeModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('click', closeModal);
    return () => {
      window.removeEventListener('click', closeModal);
      setOpen(false);
    };
  }, []);

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.25 },
      }}
      className={s.container}
    >
      {width > 500 ? (
        <div className={s.title}>Уведомления</div>
      ) : (
        <div className={s.title_container}>
          <div className={s.title}>Уведомления</div>
          <img className={s.icon} src={close_img} alt="" onClick={closeModal} />
        </div>
      )}

      <div className={s.header} />
      {
        <div className={s.notifications_container}>
          {authStore.notifications.map((notification) => (
            <NotificationBlock data={notification} />
          ))}
        </div>
      }
      <div className={s.footer} />
    </motion.div>
  );
};

export default observer(NotificationModal);
