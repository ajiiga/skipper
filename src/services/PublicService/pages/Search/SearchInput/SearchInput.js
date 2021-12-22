import React, {useMemo, useState} from 'react';
import s from './SearchInput.module.css'
import search_icon from '../../../../../static/img/Main/search_icon.png'
import DropItems from "./DropItems/DropItems";
import {observer} from "mobx-react-lite";

const SearchInput = ({value, changeValue, tags, addTag, tagList}) => {

    let [show, setShow] = useState(false)
    let [canAddTag, setCanAddTag] = useState(false)

    let list = [...tagList.map(x => x.name3)]


    let showList = useMemo(() => list.filter(x => x.toLowerCase().includes(value.toLowerCase()) && !tags.includes(x)), [value, tags])

    let _handleKeyDown =  (e) => {
        if (e.key === 'Enter') {
            if (show)
                setCanAddTag(true)
        }
    }

    return (
        <div className={s.main} onClick={e => e.stopPropagation()} onKeyDown={_handleKeyDown}>
            <div className={s.container}>
                <input placeholder={'Поиск'} type="text" value={value}
                       onChange={(event => {
                           changeValue(event.target.value)
                           setShow(true)
                       })} className={s.input}
                       onClick={() => setShow(true)} onKeyDown={_handleKeyDown}/>
                <img src={search_icon} className={s.search_icon} alt=""/>
            </div>
            {show && (
                <DropItems list={showList} setShow={setShow} addTag={addTag}
                           setValue={changeValue} canAddTag={canAddTag} setCanAddTag={setCanAddTag} />
            )}
        </div>
    );
};

export default observer(SearchInput);