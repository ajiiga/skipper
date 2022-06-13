import React, { useEffect, useMemo, useState } from 'react';
import s from '../../styles/Main.module.css';
import img from '../../../../static/img/Main/main.svg';
import search_icon from '../../../../static/img/Main/search_icon.png';
import MainSlider from './MainSlider/MainSlider';
import right_arrow from '../../../../static/img/Main/right-arrow.png';
import { Link } from 'react-router-dom';
import authStore from '../../../../store/authStore';
import publicStore from '../../../../store/publicStore';
import Preloader from '../../../../components/UI/Preloader/Preloader';
import { motion } from 'framer-motion';
import MainInput from './MainInput/MainInput';
import Footer from '../../../../components/Footer/Footer';

const Main = () => {
  let [isFetching, setIsFetching] = useState(true);
  let [items, setItems] = useState('');
  let [tags, setTags] = useState([]);
  let [searchQuery, setSearchQuery] = useState('');
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  useEffect(() => {
    publicStore.initialMainPage().then((r) => {
      setItems(r.categories);
      setTags(r.tags);
      setIsFetching(false);
    });
  }, []);

  let showList = useMemo(() => {
    return tags.filter((x) =>
      x.name3.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, tags]);

  if (isFetching) return <Preloader />;

  return (
    <motion.div
      className={s.container}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        duration: 0.25,
      }}
      exit="out"
    >
      <div className={s.content_container}>
        <div className={s.left_side}>
          <h1 className={s.title}>
            Чему бы вы хотели {width <= 500 && <br />}
            <span className={s.yellow_text}>научиться</span> сегодня?
          </h1>
          <MainInput
            tags={showList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <MainSlider items={items} />
        </div>
        <img className={s.main_img} src={img} alt="" />
      </div>
      <div className={s.lower_display}>
        <Link to={'/catalog'}>
          <div className={`${s.yellow_text} ${s.full_catalog}`}>
            Полный каталог
            <img src={right_arrow} className={s.right_arrow} alt="" />
          </div>
        </Link>
        <Link to={'/mentor_registration'}>
          {!authStore.user?.is_mentor && (
            <div className={s.to_mentor_btn}>
              Я хочу зарабывать на своих знаниях
            </div>
          )}
        </Link>
      </div>
      <Footer />
    </motion.div>
  );
};

export default Main;
