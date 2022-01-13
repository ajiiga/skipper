import React, {useEffect, useState} from 'react';
import s from "../../../styles/Main.module.css";
import img from "../../../../../static/img/Main/main.svg";
import search_icon from "../../../../../static/img/Main/search_icon.png";
import publicStore from "../../../../../store/publicStore";
import {useHistory} from 'react-router-dom'


const MainInput = ({tags, searchQuery, setSearchQuery}) => {
    let [showDropDown, setShowDropDown] = useState(false)
    let [cadAddTag, setCanAddTag] = useState(false)

    let _handleKeyDown =  (e) => {
        if (e.key === 'Enter') {
            if (showDropDown)
                setCanAddTag(true)
        }
    }

    return (
        <div className={s.relative_container} onKeyDown={_handleKeyDown}>
            <div className={s.input_container}>
                <input value={searchQuery} onChange={(event) => {
                    setSearchQuery(event.target.value)
                    setShowDropDown(true)
                }} type="text"
                       onClick={() => setShowDropDown(true)}
                       className={s.input} placeholder={'Тема консультации'}/>
                <img className={s.search_icon} src={search_icon} alt=""/>
            </div>
            {showDropDown && <MainDropItems tags={tags} setShow={setShowDropDown} setCanAddTag={setCanAddTag} canAddTag={cadAddTag}/>}
        </div>
    );
};

const MainDropItems = ({tags, setShow, canAddTag, setCanAddTag}) => {

    let history = useHistory()

    let [activeItem, setActiveItem] = useState(0)

    let closeModal = () => setShow(false)

    let addTag = (tag) => {
        publicStore.addTag(tag)
        history.push('/search')
    }

    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
            setShow(false)
        }
    }, [])


    useEffect(() => {
        setActiveItem(0)
    }, [tags])

    useEffect(() => {
        if (canAddTag) {
            addTag(tags[activeItem].name3)
        }
    }, [canAddTag])
    return (<div className={s.dropdown_menu}>
        {tags.length > 0 ? tags.map((x, index) => <div
            className={`${s.dropdown_item} ${index === activeItem ? s.dropdown_item_active : ''}`}
            onMouseEnter={() => setActiveItem(index)}
            onClick={() => addTag(x.name3)}>{x.name3}</div>) : 'Ничего не найдено'}
    </div>)
}

export default MainInput;