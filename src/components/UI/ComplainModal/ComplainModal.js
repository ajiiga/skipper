import React, {useState} from 'react';
import s from './ComplainModal.module.css'
import close from '../../../static/img/PrivateProfile/close.svg'
import CustomSelect from "../CustomSelect/CustomSelect";
import CustomMiniSelect from "../CustomMiniSelect/CusomMiniSelect";
import Button from "../Button/Button";

const ModalContainer = ({setActive, active}) => {
    let closeModal = () => {
        setActive(false)
    }

    let list = [
        'Нарушение правил Skipper',
        'Неверная цена',
        'Не оказывает эту услугу',
        'Неверное описание',
        'Не дозвониться',
        'Мошенник'
    ]


    let [selected, setSelected] = useState(list[0])


    return (
        <div className={active? `${s.background} ${s.active}`:s.background} onClick={() => closeModal()}>
            <div className={s.block} onClick={e => e.stopPropagation()}>
                <div className={s.title_container}>
                    <div/>
                    <div className={s.title}>Пожаловаться на пользователя</div>
                    <img src={close} className={s.close} alt="" onClick={() => setActive(false)}/>
                </div>
                <div className={s.content}>
                    <div className={s.select_container}><CustomMiniSelect list={list} setSelected={setSelected} selected={selected} /></div>
                    <textarea className={s.textarea} placeholder={'Расскажите нам подробнее о нарушении'}>
                    </textarea>
                    <div className={s.btn_container}><Button title={'Отправить жалобу'} /></div>
                </div>
            </div>
        </div>
    )
};

export default ModalContainer;