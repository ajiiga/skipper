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
import Footer from "../../../../components/Footer/Footer";
import useDebounce from "../../../../CustomHooks/useDebounce";
import Preloader from "../../../../components/UI/Preloader/Preloader";

const Search = () => {

    let list = ['до $5', '$5-$10', '$10-$50', 'больше $500', 'All']

    let [tagList, setTagList] = useState([])

    let [searchText, setSearchText] = useState('')


    let [searchInfo, setSearchInfo] = useState({
        range: {min: 1, max: 5},
        activeItem: list[4],
        tags: [...publicStore.tags]
    })

    let [isFetching, setIsFetching] = useState(true)


    let setActiveItem = (newActiveItem) => setSearchInfo({...searchInfo, activeItem: newActiveItem})
    let setTags = (newTags) => setSearchInfo({...searchInfo, tags: newTags})
    let setRange = (newRange) => setSearchInfo({...searchInfo, range: newRange})

    let deleteTag = (tag) => setTags([...searchInfo.tags].filter(x => x !== tag))

    let addTag = (tag) => {
        let deltaTags = [...searchInfo.tags]
        deltaTags.push(tag)
        setTags(deltaTags)
    }

    let debounceQuery = useDebounce([searchInfo], 300)

    useEffect(() => {
        let idTags = tagList.filter(x => searchInfo.tags.includes(x.name3)).map(x => x.ID)
        let request = {
            price: searchInfo.activeItem,
            rating: searchInfo.range,
            tags: idTags
        }
        publicStore.getSearchClasses(idTags, 1, 10).then(x => console.log(x))
    }, debounceQuery)

    useEffect(() => {
        publicStore.getChildTags().then(x => {
            setTagList(x)
            setIsFetching(false)
        })
        return () => publicStore.clearTags()
    },[])


    if (isFetching)
        return <Preloader />

    return (
        <>
            <div className={s.container}>
                <div className={s.fixed_sidebar}>
                    <MiniNavBar child={'Поиск'}/>
                    <SearchBar range={searchInfo.range} setRange={setRange} list={list} setActiveItem={setActiveItem}
                               activeItem={searchInfo.activeItem}/>
                </div>
                <div className={s.fake_sidebar}/>
                <div className={s.content_container}>
                    <div>7,618 специалистов найдено</div>
                    <SearchInput value={searchText} changeValue={setSearchText} tags={searchInfo.tags} addTag={addTag} tagList={tagList}/>
                    <div className={s.tags}>{searchInfo.tags.map(x => <div key={x} className={s.tag_container}>
                        <Tag title={x} onClick={() => {
                            deleteTag(x)
                        }}/></div>)}</div>
                    <SearchItem/>
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default observer(Search);