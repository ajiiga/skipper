import React, { useEffect, useMemo, useState } from 'react';
import MiniNavBar from '../../../../components/UI/MiniNavBar/MiniNavBar';
import s from './Catalog.module.css';
import Button from '../../../../components/UI/Button/Button';
import SideBar from './SideBar/SideBar';
import CatalogContent from './CatalogContent/CatalogContent';
import { getCategoriesRequest } from '../../../../api/api_public';
import publicStore from '../../../../store/publicStore';
import Preloader from '../../../../components/UI/Preloader/Preloader';
import { observer } from 'mobx-react-lite';
import { motion } from 'framer-motion';
import Footer from '../../../../components/Footer/Footer';
import {useParams} from "react-router-dom";

const Catalog = () => {
  let [isFetching, setIsFetching] = useState(true);
  let [items, setItems] = useState('');
  let params = useParams()
  let id = params.id

  useEffect(() => {
    publicStore.getCategories().then((data) => {
      let a = [];
      a.push(data);
      setItems(a);
      setIsFetching(false);
    });

    return () => publicStore.setDefaultActiveTheme();
  }, []);

  let activeThemes = useMemo(() => {
    if (Array.isArray(items)) {
      let jsonItems = JSON.parse(items);
      for (let block of jsonItems) {
        let delta = block['Child0'].filter(
          (x) => x.ID == id
        );
        if (delta.length !== 0) {
          return delta[0]['Child1'];
        }
      }
    }
    return [];
  }, [id, items]);

  if (isFetching) {
    return <Preloader />;
  }

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
      className={s.container}
    >
      <div className={s.content_container}>
        <div className={s.sidebar_container}>
          <MiniNavBar child={'Каталог'} />
          <SideBar
            items={items}
            activeTheme={id}
          />
        </div>
        <CatalogContent activeThemes={activeThemes} />
      </div>
      <Footer />
    </motion.div>
  );
};

export default observer(Catalog);
