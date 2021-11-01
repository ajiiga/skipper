import React from 'react';
import s from './Search.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import SearchBar from "./SearchBar/SearchBar";

const Search = () => {
    return (
        <div className={s.container}>
            <div className={s.fixed_sidebar}>
                <MiniNavBar child={'Поиск'} />
                <SearchBar />
            </div>

        </div>
    );
};

export default Search;