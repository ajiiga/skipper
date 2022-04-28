import React from 'react';
import s from '../../../styles/MessageModals.module.css'
import {AnimatePresence, motion} from "framer-motion";
import {useHistory, useParams} from "react-router-dom";
import closeImg from '../../../../../static/img/PrivateProfile/close.svg'

const MessageModalContainer = ({title, id, children}) => {

    const history = useHistory()

    const closeModal = () => {
        history.push(`/messages/${id}`)
    }

    return (
        <AnimatePresence>
            <motion.div className={s.modal_background}
                        key="child"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: -10}}
                        transition={{
                            duration: 0.25,
                        }} onClick={() => closeModal()}>
                <div className={s.modal_container} onClick={e => e.stopPropagation()}>
                    <div className={s.modal_upper_container}>
                        <div/>
                        <div className={s.title}>{title}</div>
                        <img src={closeImg} className={s.close} onClick={() => closeModal()} alt=""/>
                    </div>
                    <div className={s.content}>
                        {children}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default MessageModalContainer;