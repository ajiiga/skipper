import React, { useState } from "react";
import s from "../styles/MyClasses.module.css";
import ConsiderationItem from "../pages/MyClassesMentor/ConsiderationItems/ConsiderationItem";

const MyClassesSample = ({ children, activeSort, setActiveSort }) => {
  let keyList = ["signDate", "dateEvent", "expensive", "cheap"];
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  return (
    <div className={s.sample_container}>
      <div className={s.sorting_types}>
        <div>Сортировать по:</div>
        <div className={s.btn_sort_types_container}>
          <button
            className={`${s.btn_sort_types} ${
              activeSort === keyList[0] ? s.active_btn_sort_types : ""
            }`}
            onClick={() => setActiveSort(keyList[0])}
          >
            Дате записи
          </button>
          <button
            className={`${s.btn_sort_types} ${
              activeSort === keyList[1] ? s.active_btn_sort_types : ""
            }`}
            onClick={() => setActiveSort(keyList[1])}
          >
            Дате проведения
          </button>
          <button
            className={`${s.btn_sort_types} ${
              activeSort === keyList[2] ? s.active_btn_sort_types : ""
            }`}
            onClick={() => setActiveSort(keyList[2])}
          >
            Дороже
          </button>
          <button
            className={`${s.btn_sort_types} ${
              activeSort === keyList[3] ? s.active_btn_sort_types : ""
            }`}
            onClick={() => setActiveSort(keyList[3])}
          >
            Дешевле
          </button>
        </div>
      </div>
      <div className={s.item_containers}>{children}</div>
    </div>
  );
};

export default MyClassesSample;
