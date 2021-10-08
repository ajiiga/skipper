import React, {useEffect} from 'react';
import s from './ProfileModal.module.css'

const ProfileModal = ({open, setOpen}) => {
    let closeModal = () => setOpen(false)
    useEffect(() => {
        window.addEventListener('click', closeModal)
        return () => {
            window.removeEventListener('click', closeModal)
        }
    }, [])
    return (
        <div className={`${s.container} ${open && s.show}`} onClick={e => e.stopPropagation()}>
            <div className={s.block}>Техническая поддержка</div>
            <div className={s.block}>Выйти</div>
        </div>
    );
};

export default ProfileModal;