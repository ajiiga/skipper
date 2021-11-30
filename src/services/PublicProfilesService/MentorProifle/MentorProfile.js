import React, {useEffect, useState} from 'react';
import s from '../styles/PublicProfile.module.css'
import {useHistory, useParams} from "react-router-dom";
import MiniNavBar from "../../../components/UI/MiniNavBar/MiniNavBar";
import publicProfileStore from "../../../store/publicProfileStore";
import Preloader from "../../../components/UI/Preloader/Preloader";
import {API_URL} from "../../../api/api_setting";
import RateDisplay from "../../../components/UI/RateDisplay/RateDisplay";
import FollowButton from "../../../components/UI/FollowButton/FollowButton";
import ChatButton from "../../../components/UI/ChatButton/ChatButton";
import LessonStatistics from "../../../components/UI/LessonStatistics/LessonStatistics";
import Tag from "../../../components/UI/Tag/Tag";
import FreeTimeCalendar from "./FreeTimeCalendar/FreeTimeCalendar";

const MentorProfile = () => {
    let params = useParams()
    let id = params.id

    let [isFetching, setIsFetching] = useState(true)
    let [user, setUser] = useState({})
    let [active, setActive] = useState(false)

    let history = useHistory()

    useEffect(() => {
        publicProfileStore.getMentorInfo(id).then(x => {
            if (!x.response)
                history.push('/')
            setUser(x.data)
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
            <MiniNavBar child={'Профиль ментора'}/>
            <div className={s.content_container}>
                <div className={s.left_side}>
                    <div className={s.head_container}>
                        <div className={s.title}>Ментор</div>
                        <div className={s.rate_info}>
                            <div className={s.img_name}>
                                <img src={`${API_URL}${user.profile_picture}`} className={s.profile_img} alt=""/>
                                <div className={s.name}>{`${user.first_name} ${user.second_name}`}</div>
                                <div className={s.specialisation}>Senior React Native</div>
                            </div>

                            <div className={s.rate}>
                                <RateDisplay rate={4.2}/>
                                <div className={s.date}>На Skipper
                                    с {user.day} {monthName[user.month]} {user.year}</div>
                                <div className={s.stat_count}>248 занятий 46 студентов</div>
                            </div>
                        </div>
                        <div className={s.mentor_info}>
                            <div className={s.mentor_description}>
                                {user.description}
                            </div>
                            <div className={s.mentor_skills}>
                                <div className={s.tag_container}><Tag title={'React'}/></div>
                                <div className={s.tag_container}><Tag title={'Angular'}/></div>
                                <div className={s.tag_container}><Tag title={'Мобильная разработка'}/></div>
                                <div className={s.tag_container}><Tag title={'React Native'}/></div>
                                <div className={s.tag_container}><Tag title={'JavaScript'}/></div>
                                <div className={s.tag_container}><Tag title={'HTML'}/></div>
                                <div className={s.tag_container}><Tag title={'CSS'}/></div>
                            </div>
                        </div>
                        <div className={s.buttons}>
                            <div className={s.timezone}>Время пользователя {user.time}</div>
                            <div className={s.btns}>
                                <div className={s.btn_container}>
                                    <FollowButton/>
                                </div>
                                <div className={s.btn_container}>
                                    <ChatButton/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={s.info_container}>
                        <div className={s.title}>Статистика занятий</div>
                        <LessonStatistics/>
                    </div>
                </div>
                <div className={s.right_side}>
                    <div className={s.free_time_block}>
                        <div className={s.title}>Свободное время</div>
                        <FreeTimeCalendar />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MentorProfile;