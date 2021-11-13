import React from 'react';
import s from './ModalContainer.module.css'
import close from '../../../static/img/PrivateProfile/close.svg'

const ModalContainer = ({setActive, active}) => {
    let closeModal = () => {
        setActive(false)
    }

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

                </div>
            </div>
        </div>
    )
};

export default ModalContainer;