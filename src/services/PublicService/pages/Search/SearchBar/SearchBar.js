import React, {useState} from 'react';
import s from './SearchBar.module.css'
import InputRadio from "../../../../../components/UI/InputRadio/InputRadio";
import MultiRangeSlider from "../../../../../components/UI/MultiRangeSlider/MultiRangeSlider";
import Button from "../../../../../components/UI/Button/Button";

const SearchBar = ({range, setRange, list, setActiveItem, activeItem, resetFilters}) => {

    const setMinVal = (val) => {
        setRange({...range, min: val})
    }
    const setMaxVal = (val) => {
        setRange({...range, max: val})
    }


    return (
        <div className={s.container}>
            <div className={s.title}>Стоимость часа консультаций</div>
            <InputRadio list={list} activeItem={activeItem} setActiveItem={setActiveItem}/>
            <div className={s.slider_container}>
                <div className={s.slider_display}>
                    <div className={s.title}>Рейтинг</div>
                    <div className={s.rating_num}>0 - 5</div>
                </div>
                <MultiRangeSlider min={0} max={5} onChange={setRange} maxVal={range.max} setMaxVal={setMaxVal} minVal={range.min} setMinVal={setMinVal}/>
            </div>
            <div className={s.btn_container}>
                <button onClick={resetFilters} className={s.btn_clear_filter}>Сбросить все фильтры</button>
            </div>
        </div>
    );
};


export default SearchBar;