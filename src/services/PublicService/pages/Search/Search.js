import React, {useEffect, useState} from 'react';
import s from './Search.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchInput from "./SearchInput/SearchInput";
import publicStore from "../../../../store/publicStore";
import {observer} from "mobx-react-lite";
import Tag from "../../../../components/UI/Tag/Tag";
import SearchItem from "./SearchItem/SearchItem";

const Search = () => {
    let [searchText, setSearchText] = useState('')

    useEffect(() => {
        return () => {publicStore.clearTags()}
    }, [])

    return (
        <div className={s.container}>
            <div className={s.fixed_sidebar}>
                <MiniNavBar child={'Поиск'} />
                <SearchBar />
            </div>
            <div className={s.fake_sidebar}/>
            <div className={s.content_container}>
                <div>7,618 специалистов найдено</div>
                <SearchInput value={searchText} changeValue={setSearchText}/>
                <div className={s.tags}>{publicStore.getTags().map(x => <div className={s.tag_container}><Tag title={x} onClick={() => publicStore.deleteTag(x)} /></div>)}</div>
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
                <SearchItem />
            </div>
        </div>
    );
};

export default observer(Search);