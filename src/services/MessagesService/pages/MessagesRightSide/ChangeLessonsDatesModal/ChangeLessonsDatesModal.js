import React, {useEffect, useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import FreeCalendarPicker from "../../../../../components/UI/FreeCalendarPicker/FreeCalendarPicker";
import publicProfileStore from "../../../../../store/publicProfileStore";
import useQuery from "../../../../../CustomHooks/useQuery";
import s from "../../../styles/MessageModals.module.css";
import messagesStore from "../../../../../store/messagesStore";
import {useHistory} from "react-router-dom";

const ChangeLessonsDatesModal = ({id}) => {
    let query = useQuery()
    const history = useHistory()

    let lessonId = query.get("id")
    let imReceiver = query.get("im_receiver") === 'true'


    let [isFetching, setIsFetching] = useState(true)
    let [activeCount, setActiveCount] = useState(0)
    let [calendarState, setCalendarState] = useState([])
    let [dates, setDates] = useState([])
    const [dataLesson, setData] = useState([])

    const closeModal = () => {
        history.push(`/messages/${id}`)
    }


    const changeLessonDates = () => {
        if (dates.length === activeCount) {
            let sortedDates = dates.sort((a, b) => {
                let aTime = a.split(' ')
                let bTime = b.split(' ')
                let aDate = new Date(aTime[0])
                let bDate = new Date(bTime[0])
                if (aDate.getTime() === bDate.getTime()) return parseInt(aTime[1]) - parseInt(bTime[1])
                return aDate - bDate
            })
            messagesStore.changeDate(parseInt(lessonId), sortedDates, parseInt(id)).then(x => closeModal())
        }
    }

    useEffect(() => {
        messagesStore.getDataForChangeDate(parseInt(lessonId)).then(data => {
            setActiveCount(data.class_time.length)
            setDates(data.class_time)
            setCalendarState(publicProfileStore.decode(data.class_time_mask))
            setData(data)
            setIsFetching(false)
        })
    }, [])

    if (isFetching) return <></>

    return (
        <MessageModalContainer id={id} title={`Изменить время занятий`}>
            <FreeCalendarPicker setCalendarState={setCalendarState} calendarState={calendarState}
                                defaultState={publicProfileStore.decode(dataLesson.class_time_mask)}
                                activeCount={activeCount} dates={dates}
                                setDates={setDates}/>
            {imReceiver ? <div className={s.mentor_change_lesson_dates__buttons_container}>
                    <button className={s.mentor_change_lesson_dates__submit_button} onClick={closeModal}>Принять изменения
                    </button>
                    <button className={s.mentor_change_lesson_dates__change_button} onClick={changeLessonDates}>Предложить
                        другое время
                    </button>
                </div>
                :
                (<div className={s.submit_btn_container}>
                    <button className={s.submit_btn} onClick={changeLessonDates}>
                        Предложить время занятий
                    </button>
                </div>)}
        </MessageModalContainer>
    );
};

export default ChangeLessonsDatesModal;