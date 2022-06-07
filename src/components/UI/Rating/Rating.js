import React from "react";
import s from "./Rating.module.css";

const Rating = ({ num }) => {
  return (
    <>
      {num === 0 ? (
        <div className={s.no_rating}>Отзывов ещё нет</div>
      ) : (
        <div className={s.rating}>{num}</div>
      )}
    </>
  );
};

export default Rating;
