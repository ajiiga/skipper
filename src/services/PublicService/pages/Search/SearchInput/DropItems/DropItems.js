import React, {useEffect} from 'react';
import s from './DropItems.module.css';
import {observer} from "mobx-react-lite";

const DropItems = ({list, setShow, addTag}) => {
    let closeModal = () => setShow(false)
    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
            setShow(false)
        }
    }, [])
    return (
        <div className={s.items} onClick={e => e.stopPropagation()}>
            {list.length !== 0 ? list.map(x => <div key={x} onClick={() => {
                addTag(x)
                setShow(false)
            }} className={s.item}>{x}</div>) : 'Ничего не найдено'}

        </div>
    );
};

export default observer(DropItems);