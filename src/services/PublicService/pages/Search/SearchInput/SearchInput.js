import React, {useMemo, useState} from 'react';
import s from './SearchInput.module.css'
import search_icon from '../../../../../static/img/Main/search_icon.png'
import DropItems from "./DropItems/DropItems";
import publicStore from "../../../../../store/publicStore";
import {observer} from "mobx-react-lite";
import {computed} from "mobx";

const SearchInput = ({value, changeValue, getList}) => {

    let [show, setShow] = useState(false)
    let [canAddTag, setCanAddTag] = useState(false)

    let list = ['js', 'python', 'django', 'react', 'angular', 'vue', 'go', 'sql', 'postgresql', 'CSS', 'HTML', 'php', 'laravel', 'c#', 'ASP.NET', 'flask', 'nodejs']


    let showList = list.filter(x => x.toLowerCase().includes(value.toLowerCase()) && !publicStore.tags.includes(x))

    let closeAndAddItem = (item) => {
        publicStore.addTag(item)
        setShow(false)
    }

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
                <DropItems list={showList} setShow={setShow} addTag={(tag) => publicStore.addTag(tag)}
                           setValue={changeValue} getList={getList} canAddTag={canAddTag} setCanAddTag={setCanAddTag} />
            )}
        </div>
    );
};

export default observer(SearchInput);