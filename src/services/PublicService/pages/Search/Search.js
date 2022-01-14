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
import {motion} from 'framer-motion'

const Search = () => {

    let list = ['до 500₽', '500₽ - 1000₽', '1000₽ - 2000₽', '2000₽ - 5000₽', 'Все']

    let [tagList, setTagList] = useState([])

    let [searchText, setSearchText] = useState('')


    let [searchInfo, setSearchInfo] = useState({
        range: {min: 1, max: 5},
        activeItem: list[4],
        tags: [...publicStore.tags]
    })

    let [isFetching, setIsFetching] = useState(true)

    let [searchIsFetching, setSearchIsFetching] = useState(true)

    let [classes, setClasses] = useState([])


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
        publicStore.getChildTags().then(x => {
            setTagList(x)
            setIsFetching(false)
        })
        return () => publicStore.clearTags()
    }, [])


    useEffect(() => {
        if (tagList.length !== 0)
        {
            setSearchIsFetching(true)
            let idTags = tagList.filter(x => searchInfo.tags.includes(x.name3)).map(x => x.ID)
            let request = {
                price: searchInfo.activeItem,
                rating: searchInfo.range,
                tags: idTags
            }
            let strTags = idTags.join(',')
            publicStore.getSearchClasses(strTags === "" ? undefined : strTags, 1, 100).then(x => {
                setClasses(x)
                setSearchIsFetching(false)
            })
        }
    }, [debounceQuery, tagList])

    if (isFetching)
        return <Preloader/>

    return (
        <>
            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1
                }}
                transition={{
                    duration: 0.25
                }}
                className={s.container}>
                <div className={s.fixed_sidebar}>
                    <MiniNavBar child={'Поиск'}/>
                    <SearchBar range={searchInfo.range} setRange={setRange} list={list} setActiveItem={setActiveItem}
                               activeItem={searchInfo.activeItem}/>
                </div>
                <div className={s.fake_sidebar}/>
                <div className={s.content_container}>
                    <div>{classes.filter(x => {
                        let lenTags = x.classes.map(x => x.Tags.length)
                        return lenTags.reduce((previousValue, currentValue) => previousValue + currentValue, 0) !== 0
                    }).length} специалистов найдено</div>
                    <SearchInput value={searchText} changeValue={setSearchText} tags={searchInfo.tags} addTag={addTag}
                                 tagList={tagList}/>
                    <div className={s.tags}>{searchInfo.tags.map(x => <div key={x} className={s.tag_container}>
                        <Tag title={x} onClick={() => {
                            deleteTag(x)
                        }}/></div>)}</div>
                    {
                        classes.filter(x => {
                            let lenTags = x.classes.map(x => x.Tags.length)
                            return lenTags.reduce((previousValue, currentValue) => previousValue + currentValue, 0) !== 0
                        }).map(x => {
                            return <SearchItem key={x.ID} id={x.ID} first_name={x.FirstName} second_name={x.SecondName}
                                        specialization={x.Specialization} description={x.Description}
                                        picture={x.ProfilePicture} classes={x.classes} tags={tagList}/>
                        })
                    }
                </div>
            </motion.div>
            <Footer/>
        </>
    );
};

export default observer(Search);