import React, {useEffect, useState} from 'react';
import s from '../../styles/Main.module.css'
import img from '../../../../static/img/Main/main.svg'
import search_icon from '../../../../static/img/Main/search_icon.png'
import MainSlider from "./MainSlider/MainSlider";
import right_arrow from '../../../../static/img/Main/right-arrow.png'
import {Link} from "react-router-dom";
import authStore from "../../../../store/authStore";
import publicStore from "../../../../store/publicStore";
import Preloader from "../../../../components/UI/Preloader/Preloader";
import {motion} from 'framer-motion'

const Main = () => {
    let [isFetching, setIsFetching] = useState(true)
    let [items, setItems] = useState('')
    let [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        publicStore.getMainSection().then(r => {
            let jsonItems = JSON.parse(r)
            console.log('jsonItems', jsonItems)
            setItems(jsonItems)
            setIsFetching(false)
        })
    }, [])

    if (isFetching)
        return <Preloader/>

    return (
        <motion.div className={s.container}
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.25
                    }}
                    exit="out">
            <div className={s.content_container}>
                <div className={s.left_side}>
                    <h1 className={s.title}>Чему бы вы хотели <span className={s.yellow_text}>научиться</span> сегодня?
                    </h1>
                    <div className={s.input_container}>
                        <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} type="text"
                               className={s.input} placeholder={'Тема консультации'}/>
                        <img className={s.search_icon} src={search_icon} alt=""/>
                    </div>
                    <MainSlider
                        items={items}/>
                </div>
                <img className={s.main_img} src={img} alt=""/>
            </div>
            <div className={s.lower_display}>
                <Link to={'/catalog'}>
                    <div className={`${s.yellow_text} ${s.full_catalog}`}>Полный каталог <img src={right_arrow}
                                                                                              className={s.right_arrow}
                                                                                              alt=""/></div>
                </Link>
                <Link to={'/mentor_registration'}>
                    {!authStore.user?.is_mentor &&
                    <div className={s.to_mentor_btn}>Я хочу зарабывать на своих знаниях</div>}
                </Link>
            </div>

        </motion.div>
    );
};

export default Main;