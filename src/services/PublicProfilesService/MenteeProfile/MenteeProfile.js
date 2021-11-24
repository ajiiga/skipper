import React, {useEffect, useState} from 'react';
import {withRouter, useParams} from "react-router-dom";
import MiniNavBar from "../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../styles/PublicProfile.module.css'
import default_img from '../../../static/img/PrivateProfile/profile.svg'
import Rating from "../../../components/UI/Rating/Rating";
import FollowButton from "../../../components/UI/FollowButton/FollowButton";
import ChatButton from "../../../components/UI/ChatButton/ChatButton";
import LessonStatistics from "../../../components/UI/LessonStatistics/LessonStatistics";
import Reviews from "../../../components/UI/Reviews/Reviews";
import publicProfileStore from "../../../store/publicProfileStore";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {API_URL} from "../../../api/api_setting";

const MenteeProfile = ({}) => {
    let params = useParams()
    let id = params.id

    let [isFetching, setIsFetching] = useState(true)
    let [user, setUser] = useState({})

    useEffect(() => {
        setIsFetching(true)
        publicProfileStore.getMenteeInfo(id).then(x => {
            setUser(x)
            console.log(x)
            setIsFetching(false)
        })
    }, [])

    if (isFetching) {
        return <Preloader/>
    }

    let monthName = {
        1: 'января',
        2: 'февраля',
        3: 'марта',
        4: 'апреля',
        5: 'мая',
        6: 'июня',
        7: 'июля',
        8: 'августа',
        9: 'сентября',
        10: 'октября',
        11: 'ноября',
        12: 'декабря'
}


    return (
        <div className={s.container}>
            <MiniNavBar child={`Профиль менти ${params.id}`}/>
            <div className={s.content_container}>
                <div className={s.left_side}>
                    <div className={s.head_container}>
                        <div className={s.title}>Менти</div>
                        <div className={s.rate_info}>
                            <div className={s.img_name}>
                                <img src={`${API_URL}${user.profile_picture}`} className={s.profile_img} alt=""/>
                                <div className={s.name}>{`${user.first_name} ${user.second_name}`}</div>
                            </div>

                            <div className={s.rate}>
                                <Rating num={4.5}/>
                                <div className={s.date}>На Skipper с {user.day} {monthName[user.month]} {user.year}</div>
                                <div>248 занятий</div>
                            </div>
                        </div>
                        <div className={s.buttons}>
                            <div className={s.btn_container}>
                                <FollowButton/>
                            </div>
                            <div className={s.btn_container}>
                                <ChatButton/>
                            </div>
                        </div>
                    </div>

                    <div className={s.info_container}>
                        <div className={s.title}>Статистика занятий</div>
                        <LessonStatistics />
                    </div>
                    <div className={s.hate_buttons}>
                        <div className={s.btn}>
                            Пожаловаться
                        </div>
                        <div className={s.btn}>
                            Заблокировать профиль
                        </div>
                    </div>
                </div>
                <div className={s.right_side}>
                    <div className={s.reviews_block}>
                        <div className={s.title}>Отзывы</div>
                        <Reviews />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(MenteeProfile);