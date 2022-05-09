import React, {useEffect, useState} from 'react';
import {useParams, useHistory} from "react-router-dom";
import s from './ModalRegistrationLesson.module.css'
import {motion, AnimatePresence} from 'framer-motion';
import close from "../../../../static/img/PrivateProfile/close.svg";
import SelectTypeLesson from "./SelectTypeLesson/SelectTypeLesson";
import Button from "../../../../components/UI/Button/Button";
import SelectCountLesson from "./SelectCountLesson/SelectCountLesson";
import FreeTimeCalendar from "../FreeTimeCalendar/FreeTimeCalendar";
import FreeCalendarPicker from "../../../../components/UI/FreeCalendarPicker/FreeCalendarPicker";
import StageDisplay from "./StageDisplay/StageDisplay";
import SelectCommunicationType from "./SelectCommunicationType/SelectCommunicationType";
import arrow from '../../../../static/img/Main/pointer.png'
import publicProfileStore from "../../../../store/publicProfileStore";
import privateProfileStore from "../../../../store/privateProfileStore";


const ModalRegistrationLesson = ({classes, communications}) => {


    let [isFetching, setIsFetching] = useState(true)
    let [myCommunications, setMyCommunications] = useState([])





    let defaultState = {
        min15: {count1: false},
        min30: {count1: false, count3: false, count5: false},
        min60: {count1: false, count3: false, count5: false},
        min90: {count1: false, count3: false, count5: false},
        minIndividualTerm: {count1: false}
    }

    let getTrueKey = (state) => {
        let keys = Object.keys(state)
        let res = []
        keys.forEach(key => {
            let childKeys = Object.keys(state[key])
            childKeys.forEach(childKey => {
                if (state[key][childKey]) {
                    res = [key.replace('min', ''), childKey.replace('count', '')]
                }
            })
        })
        return res
    }


    let types = ['TheoreticClass', 'PracticClass', 'KeyClass']
    let typesForRequest = {TheoreticClass: 'theoretic_class', PracticClass: 'practic_class', KeyClass: 'key_class'}

    let params = useParams()
    let history = useHistory()
    let parent_id = classes[0].ParentId
    let service = classes.filter(x => x.ID == params.service_id)[0]
    let closeModal = () => {
        setIsVisible(false)
        setTimeout(() => history.push(`/mentor-profile/${parent_id}`), 250)
    }
    let [isVisible, setIsVisible] = useState(true)


    let [selectedType, setSelectedType] = useState(-1)
    let [stage, setStage] = useState(1)
    let [timeLessons, setTimeLessons] = useState(defaultState)

    let [activeCount, setActiveCount] = useState(0)


    let disableStatus = (stage_num) => {
        if (stage_num === 1) {
            return selectedType === -1
        }

        if (stage_num === 2) {
            return !(timeLessons.min15.count1 ||
                timeLessons.min30.count1 ||
                timeLessons.min30.count3 ||
                timeLessons.min30.count5 ||
                timeLessons.min60.count1 ||
                timeLessons.min60.count3 ||
                timeLessons.min60.count5 ||
                timeLessons.min90.count1 ||
                timeLessons.min90.count3 ||
                timeLessons.min90.count5 ||
                timeLessons.minIndividualTerm.count1)
        }

        if (stage_num === 3) {
            return dates.length !== activeCount
        }

        if (stage_num === 4) {
            if (activeCommunication === undefined) return true

            if (activeCommunication.sendRequest) {
                return activeCommunication.loginText === ''
            }
            else {
                return false
            }
        }
    }

    let handleNextStageButton = (stage_num) => {
        if (stage_num === 4) {
            let [time, count] = getTrueKey(timeLessons)
            let service_type_key = types[selectedType]
            let sortedDates = dates.sort((a, b) => {
                let aDate = new Date(a.split(' ')[0])
                let bDate = new Date(b.split(' ')[0])
                return aDate - bDate
            })
            let request = {
                class_type: typesForRequest[service_type_key],
                class_id: parseInt(params.service_id),
                mentor_id: service?.ParentId,
                time: sortedDates,
                communication: activeCommunication.loginId

            }
            if (time == 15) {
                request[`duration_${time}`] = true
                request[`price_${time}`] = service[service_type_key][`Price${time}`] * parseInt(count)
            }
            else if (time === 'IndividualTerm') {
                request[`full_time`] = true
                request[`price_full_time`] = service[service_type_key][`PriceFullTime`] * parseInt(count)
            }
            else {
                request[`duration_${time}_${count}`] = true

                request[`price_${time}_${count}`] = service[service_type_key][`Price${time}`] * parseInt(count)
            }

            if (activeCommunication.sendRequest) {
                privateProfileStore.addCommunication(activeCommunication.messengerId, activeCommunication.loginText).then(r => {
                    publicProfileStore.registrationLesson(request).then(x => closeModal())
                })
            }
            else {
                publicProfileStore.registrationLesson(request).then(x => closeModal())
            }
        } else
            setStage(stage_num + 1)
    }

    let handlePrevStageButton = (stage_num) => {
        setStage(stage_num - 1)
        if (stage_num === 2) {
            setTimeLessons(defaultState)
        }

        if (stage_num === 3) {
            setDates([])
        }

        if (stage_num === 4) {
            setActiveCommunication(undefined)
        }
    }

    let decode = publicProfileStore.decode


    let [calendarState, setCalendarState] = useState(Array.from(Array(8), _ => Array(7).fill(0)))

    let [activeCommunication, setActiveCommunication] = useState(undefined)
    let [dates, setDates] = useState([])

    useEffect(() => {
        privateProfileStore.getMyCommunications().then(data => {
            let communicationList = data.map(com => com.Messenger[0].ID)
            let communicationListNoRepeat = [...new Set(communicationList)]
            setMyCommunications(communicationListNoRepeat)
            setIsFetching(false)
        })
    }, [])



    useEffect(() => {
        if (selectedType !== -1) {
            setCalendarState(decode(service[types[selectedType]].Time))
        }
    }, [selectedType])


    if (isFetching) {
        return <></>
    }

    return (
        <AnimatePresence>
            {isVisible && <motion.div
                key="child"
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: -10}}
                transition={{
                    duration: 0.25,
                }}
                className={s.background}
                onClick={() => closeModal()}>
                <div className={s.block} onClick={e => e.stopPropagation()}>
                    <div className={s.title_container}>
                        {stage > 1 ?
                            <img src={arrow} onClick={() => handlePrevStageButton(stage)} alt="" className={s.arrow}/> :
                            <div/>}
                        <div className={s.title}>Тип занятия</div>
                        <img src={close} className={s.close} alt="" onClick={() => closeModal()}/>
                        <StageDisplay num={stage}/>
                    </div>
                    <div className={s.content_container}>
                        {stage === 1 && <SelectTypeLesson
                            practice={service.PracticClass.ClassParentId !== 0}
                            theory={service.TheoreticClass.ClassParentId !== 0}
                            turnkey={service.KeyClass.ClassParentId !== 0}
                            selectedType={selectedType}
                            setSelectedType={setSelectedType}
                        />}
                        {stage === 2 &&
                        <SelectCountLesson setActiveCount={setActiveCount} lesson={service[types[selectedType]]}
                                           defaultState={defaultState}
                                           setTimeLessons={setTimeLessons} timeLessons={timeLessons}/>}
                        {stage === 3 && <FreeCalendarPicker activeCount={activeCount}
                                                            defaultState={decode(service[types[selectedType]].Time)}
                                                            dates={dates} setDates={setDates}
                                                            calendarState={calendarState}
                                                            setCalendarState={setCalendarState}/>}
                        {stage === 4 &&
                        <SelectCommunicationType communications={communications} myCommunications={myCommunications} setActiveItem={setActiveCommunication}
                                                 activeItem={activeCommunication}/>}

                    </div>
                    <div className={s.btn_container}>
                        <button disabled={disableStatus(stage)} onClick={() => handleNextStageButton(stage)}
                                className={s.next_btn}>{stage !== 4 ? 'Дальше' : 'Записаться'}
                        </button>
                    </div>
                </div>

            </motion.div>}
        </AnimatePresence>
    );
};

export default ModalRegistrationLesson;