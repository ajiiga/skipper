import React, { useEffect, useState } from "react";
import s from "./MyLessonsButton.module.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MyLessonsButton = ({ isMentor, setOpenMobileMenu }) => {
  let [active, setActive] = useState(false);

  if (!isMentor)
    return (
      <Link to={"/my-classes-mentee"} onClick={() => setOpenMobileMenu(false)}>
        <div className={s.my_lessons}>Мои занятия</div>
      </Link>
    );

  return (
    <div className={`${s.relative} ${s.hidden_on_mobile}`}>
      <div className={s.my_lessons} onClick={() => setActive(true)}>
        Мои занятия
      </div>
      {active && (
        <DropDown setActive={setActive} setOpenMobileMenu={setOpenMobileMenu} />
      )}
    </div>
  );
};

let DropDown = ({ setActive, setOpenMobileMenu }) => {
  let closeModal = () => setActive(false);

  useEffect(() => {
    window.addEventListener("click", closeModal);
    return () => {
      window.removeEventListener("click", closeModal);
      setActive(false);
    };
  }, []);

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
      className={s.dropdown}
    >
      <Link to={"/my-classes-mentor"}>
        <div className={s.btn} onClick={() => setOpenMobileMenu(false)}>
          Ментор
        </div>
      </Link>
      <Link to={"/my-classes-mentee"}>
        <div className={s.btn} onClick={() => setOpenMobileMenu(false)}>
          Менти
        </div>
      </Link>
    </motion.div>
  );
};

export default MyLessonsButton;
