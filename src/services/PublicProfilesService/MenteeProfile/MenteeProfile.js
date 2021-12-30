import React, {useEffect, useState} from 'react';
import {withRouter, useParams} from "react-router-dom";
import MiniNavBar from "../../../components/UI/MiniNavBar/MiniNavBar";
import s from '../styles/PublicProfile.module.css'
import FollowButton from "../../../components/UI/FollowButton/FollowButton";
import ChatButton from "../../../components/UI/ChatButton/ChatButton";
import LessonStatistics from "../../../components/UI/LessonStatistics/LessonStatistics";
import Reviews from "../../../components/UI/Reviews/Reviews";
import publicProfileStore from "../../../store/publicProfileStore";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {API_URL} from "../../../api/api_setting";
import { useHistory } from "react-router-dom"
import RateDisplay from "../../../components/UI/RateDisplay/RateDisplay";
import ComplainModal from "../../../components/UI/ComplainModal/ComplainModal";

const MenteeProfile = ({}) => {
    let params = useParams()
    let id = params.id

    let [isFetching, setIsFetching] = useState(true)
    let [user, setUser] = useState({})
    let [active, setActive] = useState(false)

    let history = useHistory()

    useEffect(() => {
        setIsFetching(true)
        publicProfileStore.getMenteeInfo(id).then(x => {
            if (!x.response)
                history.push('/')
            setUser(x.data)
            console.log(x)
            setIsFetching(false)
        })
    }, [id])

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
            <MiniNavBar child={`Профиль менти`}/>
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
                                <RateDisplay rate={4.2} />
                                <div className={s.date}>На Skipper с {user.day} {monthName[user.month]} {user.year}</div>
                                <div className={s.stat_count}>248 занятий</div>
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
                        <div className={s.btn} onClick={() => setActive(true)}>
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
                        <Reviews n={3} />
                    </div>
                </div>
            </div>
            <ComplainModal active={active} setActive={setActive} />
        </div>
    );
};

export default withRouter(MenteeProfile);


