import React from 'react';
import s from './ModalContainer.module.css'
import close from '../../../static/img/PrivateProfile/close.svg'
import {values} from "mobx";
import {Formik} from "formik";
import * as yup from "yup";

const ModalContainer = ({setActive, active, children, title}) => {
    let closeModal = () => {
        setActive(false)
    }


    return (
        <div className={active? `${s.background} ${s.active}`:s.background} onClick={() => closeModal()}>
            <div className={s.block} onClick={e => e.stopPropagation()}>
                <div className={s.title_container}>
                    <div/>
                    <div className={s.title}>{title}</div>
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