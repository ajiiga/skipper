import React, {useEffect, useState} from 'react';
import MessageModalContainer from "../MessageModalContainer/MessageModalContainer";
import FreeCalendarPicker from "../../../../../components/UI/FreeCalendarPicker/FreeCalendarPicker";
import publicProfileStore from "../../../../../store/publicProfileStore";
import useQuery from "../../../../../CustomHooks/useQuery";
import s from "../../../styles/MessageModals.module.css";
import messagesStore from "../../../../../store/messagesStore";

const ChangeLessonsDatesModal = ({id}) => {



    let query = useQuery()
    let lessonId = query.get("id")



    let [isFetching, setIsFetching] = useState(true)
    let [activeCount, setActiveCount] = useState(0)
    let [calendarState, setCalendarState] = useState([])
    let [dates, setDates] = useState([])
    const [defaultState, setDefaultState] = useState([])



    const changeLessonDates = () => {
        if (dates.length === activeCount) {
            messagesStore.changeDate(parseInt(lessonId), dates)
        }
    }

    useEffect(() => {
        messagesStore.getDataForChangeDate(parseInt(lessonId)).then(data => {
            setActiveCount(data.class_time.length)
            setDates(data.class_time)
            setCalendarState(publicProfileStore.decode(data.class_time_mask))
            setDefaultState(publicProfileStore.decode(data.class_time_mask))
            setIsFetching(false)
        })
    }, [])

    if (isFetching) return <></>

    return (
        <MessageModalContainer id={id} title={`Изменить время занятий`}>
            <FreeCalendarPicker setCalendarState={setCalendarState} calendarState={calendarState}
                                defaultState={defaultState} activeCount={activeCount} dates={dates}
                                setDates={setDates}/>
            <div className={s.submit_btn_container}>
                <button className={s.submit_btn} onClick={() => changeLessonDates()}>
                    Предложить время занятий
                </button>
            </div>
        </MessageModalContainer>
    );
};

export default ChangeLessonsDatesModal;