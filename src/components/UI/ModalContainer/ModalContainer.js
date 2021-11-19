import React from 'react';
import s from './ModalContainer.module.css'
import close from '../../../static/img/PrivateProfile/close.svg'
import {values} from "mobx";
import {Formik} from "formik";
import * as yup from "yup";

const ModalContainer = ({setActive, active, children}) => {
    let closeModal = () => {
        setActive(false)
    }
    const validationSchema = yup.object({
        login: yup.string().required('Обязательное поле'),
    })


    return (
        <div className={active? `${s.background} ${s.active}`:s.background} onClick={() => closeModal()}>
            <div className={s.block} onClick={e => e.stopPropagation()}>
                <div className={s.title_container}>
                    <div/>
                    <div className={s.title}>Добавление нового вида связи</div>
                    <img src={close} className={s.close} alt="" onClick={() => setActive(false)}/>
                    <div className={s.circle}/>
                </div>
                <div className={s.content}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default ModalContainer;