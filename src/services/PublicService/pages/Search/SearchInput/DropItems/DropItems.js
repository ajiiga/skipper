import React, {useEffect, useState} from 'react';
import s from './DropItems.module.css';
import {observer} from "mobx-react-lite";

const DropItems = ({list, setShow, addTag, setValue, getList, canAddTag, setCanAddTag}) => {
    let [activeItem, setActiveItem] = useState(0)
    let closeModal = () => setShow(false)
    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
            setShow(false)
        }
    }, [])

    useEffect(() => {
        if (list.length !== 0)
            setActiveItem(0)

    }, [list])



    useEffect(() => {
        if (canAddTag) {
            addTag(list[activeItem])
            setShow(false)
            setValue('')
            getList()
            setCanAddTag(false)
        }
    }, [canAddTag])

    return (
        <div className={s.items} onClick={e => e.stopPropagation()}>
            {list.length !== 0 ? list.map((x, index) => <div key={x} onClick={() => {
                addTag(x)
                setShow(false)
                setValue('')
                getList()
            }} onMouseEnter={() => setActiveItem(index)} className={`${s.item} ${activeItem === index ? s.active : ''}`}>{x}</div>) : 'Ничего не найдено'}

        </div>
    );
};

export default observer(DropItems);