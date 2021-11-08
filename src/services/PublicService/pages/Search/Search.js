import React, {useEffect, useState} from 'react';
import s from './Search.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import SearchBar from "./SearchBar/SearchBar";
import SearchInput from "./SearchInput/SearchInput";
import publicStore from "../../../../store/publicStore";
import {observer} from "mobx-react-lite";
import Tag from "../../../../components/UI/Tag/Tag";
import SearchItem from "./SearchItem/SearchItem";
import {autorun} from "mobx";

const Search = () => {

    let list = ['до $5', '$5-$10', '$10-$50', 'больше $500', 'All']

    let [searchText, setSearchText] = useState('')

    let [range, setRange] = useState({min: 1, max: 5})

    let [activeItem, setActiveItem] = useState(list[0])

    let getList = () => {
        let request = {
            price: activeItem,
            rating: range,
            tags: publicStore.tags
        }
        console.log(request)
    }

    useEffect(() => {
        return () => {publicStore.clearTags()}
    }, [])


    useEffect(() => {
        getList()
    }, [activeItem, range])

    return (
        <div className={s.container}>
            <div className={s.fixed_sidebar}>
                <MiniNavBar child={'Поиск'} />
                <SearchBar range={range} setRange={setRange} list={list} setActiveItem={setActiveItem} activeItem={activeItem}/>
            </div>
            <div className={s.fake_sidebar}/>
            <div className={s.content_container}>
                <div>7,618 специалистов найдено</div>
                <SearchInput value={searchText} changeValue={setSearchText} getList={getList}/>
                <div className={s.tags}>{publicStore.getTags().map(x => <div key={x} className={s.tag_container}><Tag title={x} onClick={() => {
                    publicStore.deleteTag(x)
                    getList()
                }} /></div>)}</div>
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