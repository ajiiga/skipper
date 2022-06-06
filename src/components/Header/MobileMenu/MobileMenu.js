import React from "react";
import s from "./MobileMenu.module.css";
import { Link } from "react-router-dom";
import MyLessonsButton from "../../UI/MyLessonsButton/MyLessonsButton";
import { motion } from "framer-motion";
import close_img from "../../../static/img/header_icons/close.svg";
import arrow_img from "../../../static/img/header_icons/rightArrow.svg";

const MobileMenu = ({ setOpenMobileMenu, profile }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        x: [-150, 0],
      }}
      transition={{
        duration: 0.2,
        type: "spring",
      }}
      className={s.modal}
    >
      <div className={s.modal}>
        <div className={s.left_side}></div>
        <div className={s.right_side}>
          <div className={s.links}>
            <div className={s.close_btn}>
              <img
                className={s.icon}
                src={close_img}
                alt=""
                onClick={() => setOpenMobileMenu(false)}
              />
            </div>
            <div className={s.link}>
              <MyLessonsButton
                isMentor={profile.is_mentor}
                className={s.hidden_on_mobile}
                setOpenMobileMenu={setOpenMobileMenu}
              />
              <img className={s.icon} src={arrow_img} alt="" />
            </div>
            <Link
              onClick={() => setOpenMobileMenu(false)}
              to={
                profile.is_mentor
                  ? `/mentor-profile/${profile.id}`
                  : `/mentee-profile/${profile.id}`
              }
            >
              <div className={s.link}>
                Профиль
                <img className={s.icon} src={arrow_img} alt="" />
              </div>
            </Link>
            <Link to={"/messages"} onClick={() => setOpenMobileMenu(false)}>
              <div className={s.link}>
                Сообщения
                <img className={s.icon} src={arrow_img} alt="" />
              </div>
            </Link>
            <Link to={"/favorites"} onClick={() => setOpenMobileMenu(false)}>
              <div className={s.link}>
                Избранное
                <img className={s.icon} src={arrow_img} alt="" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
