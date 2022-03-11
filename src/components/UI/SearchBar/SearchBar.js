import React from 'react';
import s from "../../../services/MyClassesService/pages/EditClasses/EditNavBar/EditNavBar.module.css";
import search_icon from "../../../static/img/Main/search_icon.png";

const SearchBar = ({query, setQuery}) => {
    return (
        <div className={s.input_container}>
            <input value={query} onChange={(event => setQuery(event.target.value))} className={s.input} placeholder={'Поиск'} type="text"/>
            <img className={s.search_icon} src={search_icon} alt=""/>
        </div>
    );
};

export default SearchBar;