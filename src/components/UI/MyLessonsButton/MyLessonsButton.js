import React, {useEffect, useState} from 'react';
import s from "./MyLessonsButton.module.css";
import {Link} from "react-router-dom";
import {motion} from 'framer-motion'

const MyLessonsButton = ({isMentor}) => {
    let [active, setActive] = useState(false)

    if (!isMentor)
        return (
            <Link to={'/my-classes-mentee'}>
                <div className={s.my_lessons}>Мои занятия</div>
            </Link>
        );


    return (
        <div className={s.relative}>
            <div className={s.my_lessons} onClick={() => setActive(true)}>Мои занятия</div>
            {active && <DropDown setActive={setActive}/>}
        </div>
    )
};

let DropDown = ({setActive}) => {

    let closeModal = () => setActive(false)

    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
            setActive(false)
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

            className={s.dropdown}>
            <Link to={'/my-classes-mentor'}><div className={s.btn}>
                Ментор
            </div></Link>
            <Link to={'/my-classes-mentee'}><div className={s.btn}>
                Менти
            </div></Link>
        </motion.div>
    )
}

export default MyLessonsButton;