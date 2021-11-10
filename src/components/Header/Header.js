import React, {useState} from 'react';
import s from './Header.module.css'
import profileImg from '../../static/img/profile-img.jpg'
import {Link} from "react-router-dom";
import ProfileModal from "./ProfileModal/ProfileModal";
import {observer} from "mobx-react-lite";

const Header = ({isAuth, profile}) => {

    let [openModal, setOpenModal] = useState(false)

    //Хэдэр для не аутенфицированных пользователей
    if (!isAuth) return (
        <>
            <header className={`${s.header} ${s.header_fixed}`}>
                <div className={s.header_container}>
                    <Link to={'/'}><span className={s.logo}>Skipper</span></Link>
                    <div className={s.right_container}>
                        <div>Change language</div>
                        <Link to={'/registration'}>
                            <div className={s.to_auth}>Регистрация</div>
                        </Link>
                        <Link to={'/login'}>
                            <div className={s.to_auth}>Войти</div>
                        </Link>
                    </div>
                </div>
            </header>
            <div className={s.hidden_block}>

            </div>
        </>
    )

    // Хэдэр для аутенфицированных пользователей
    return (
        <>
            <header className={`${s.header} ${s.header_fixed}`}>
                <div className={s.header_container}>
                    <div className={s.left_container}>
                        <Link to={'/'}><span className={s.logo}>Skipper</span></Link>
                        <div className={s.icons}>
                            <div className={s.icon}></div>
                            <div className={s.icon}></div>
                            <div className={s.icon}></div>
                            <div className={s.icon}></div>
                            <div className={s.icon}></div>
                        </div>
                    </div>
                    <div className={`${s.right_container} ${s.right_container_is_auth}`}>
                        <div>Найти ментора</div>
                        <div>Change language</div>

                        <div className={s.icons}>
                            <div className={s.icon}></div>
                            <div className={s.icon}></div>
                        </div>
                        <div>
                            <div className={s.profile_block} onClick={() => setOpenModal(true)}>
                                <div className={s.profile_content}>
                                    <div>{profile.first_name} {profile.second_name}</div>
                                    <div className={s.status}>{profile?.is_mentor ? 'ментор' : 'менти'}</div>
                                </div>
                                <img src={profileImg} alt="" className={s.profile_img}/>
                            </div>
                            {openModal && <ProfileModal open={true} setOpen={setOpenModal}/>}
                        </div>
                    </div>

                </div>
            </header>
            <div className={s.hidden_block}>

            </div>
        </>
    )
};

export default observer(Header);