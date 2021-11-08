import React, {useMemo, useState} from 'react';
import s from './SearchInput.module.css'
import search_icon from '../../../../../static/img/Main/search_icon.png'
import DropItems from "./DropItems/DropItems";
import publicStore from "../../../../../store/publicStore";
import {observer} from "mobx-react-lite";
import {computed} from "mobx";

const SearchInput = ({value, changeValue, getList}) => {

    let [show, setShow] = useState(false)

    let list = ['js', 'python', 'django', 'react', 'angular', 'vue', 'go', 'sql', 'postgresql', 'CSS', 'HTML', 'php', 'laravel', 'c#', 'ASP.NET', 'flask', 'nodejs']


    let showList = list.filter(x => x.toLowerCase().includes(value.toLowerCase()) && !publicStore.tags.includes(x))


    return (
        <div className={s.main} onClick={e => e.stopPropagation()}>
            <div className={s.container}>
                <input placeholder={'Поиск'} type="text" value={value}
                       onChange={(event => changeValue(event.target.value))} className={s.input}
                        onClick={() => setShow(true)}/>
                <img src={search_icon} className={s.search_icon} alt=""/>
            </div>
            {show && (
                <DropItems list={showList} setShow={setShow} addTag={(tag) => publicStore.addTag(tag)} setValue={changeValue} getList={getList} />
            )}
        </div>
    );
};

export default observer(SearchInput);