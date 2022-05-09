import React, {useEffect, useState} from 'react';
import s from './EditWorkPlace.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import Button from "../../../../../components/UI/Button/Button";
import {Switch, Route, useLocation, useParams, NavLink, Redirect} from "react-router-dom";
import authStore from "../../../../../store/authStore";
import LessonWorkPlace from "./LessonWorkPlace/LessonWorkPlace";
import TurnKeyWorkPlace from "./TurnKeyWorkPlace/TurnKeyWorkPlace";
import WorkDefaultScreen from "./WorkDefaultScreen/WorkDefaultScreen";
import PracticeWorkPlace from "./PracticeWorkPlace/PracticeWorkPlace";
import TheoryWorkPlace from "./TheoryWorkPlace/TheoryWorkPlace";
import TextareaCompetence from "./TextareaCompetence/TextareaCompetence";
import publicStore from "../../../../../store/publicStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import myClassesStore from "../../../../../store/myClassesStore";
import publicProfileStore from "../../../../../store/publicProfileStore";

const EditWorkPlace = ({list, setClasses, classes, activeItem, setActiveItem}) => {
    let location = useLocation()

    //
    let [practiceState, setPracticeState] = useState({
        active: false,
        valid: false,
        '15_min': {status: false, price: ''},
        '30_min': {status: false, price: ''},
        '60_min': {status: false, price: ''},
        '90_min': {status: false, price: ''},
        calendar: Array.from(Array(8), _ => Array(7).fill(0))
    })

    //
    let [theoryState, setTheoryState] = useState({
        active: false,
        valid: false,
        '15_min': {status: false, price: ''},
        '30_min': {status: false, price: ''},
        '60_min': {status: false, price: ''},
        '90_min': {status: false, price: ''},
        calendar: Array.from(Array(8), _ => Array(7).fill(0))
    })

    //
    let [turnkeyState, setTurnkeyState] = useState({
        active: false,
        valid: false,
        '15_min': {status: false, price: ''},
        individual_term: {status: false, price: ''},
        calendar: Array.from(Array(8), _ => Array(7).fill(0))
    })

    useEffect(() => {
        if (activeItem === 0) {
            setPracticeState({
                active: false,
                valid: false,
                '15_min': {status: false, price: ''},
                '30_min': {status: false, price: ''},
                '60_min': {status: false, price: ''},
                '90_min': {status: false, price: ''},
                calendar: Array.from(Array(8), _ => Array(7).fill(0))
            })
            setTheoryState({
                active: false,
                valid: false,
                '15_min': {status: false, price: ''},
                '30_min': {status: false, price: ''},
                '60_min': {status: false, price: ''},
                '90_min': {status: false, price: ''},
                calendar: Array.from(Array(8), _ => Array(7).fill(0))
            })

            setTurnkeyState({
                active: false,
                valid: false,
                '15_min': {status: false, price: ''},
                individual_term: {status: false, price: ''},
                calendar: Array.from(Array(8), _ => Array(7).fill(0))
            })

            setForm({name: '', description: ''})
            setTags([])
        } else {
            let classItem = classes.filter(x => x.ID === activeItem)[0]
            setForm({name: classItem.ClassName, description: classItem.Description})
            setTags(classItem.Tags.map(x => x.ID))
            if (classItem.PracticClass.ClassParentId === 0)
                setPracticeState({
                    active: false,
                    valid: false,
                    '15_min': {status: false, price: ''},
                    '30_min': {status: false, price: ''},
                    '60_min': {status: false, price: ''},
                    '90_min': {status: false, price: ''},
                    calendar: Array.from(Array(8), _ => Array(7).fill(0))
                })
            else
                setPracticeState({
                    active: true,
                    valid: true,
                    '15_min': {status: classItem.PracticClass.Duration15, price: classItem.PracticClass.Price15},
                    '30_min': {status: classItem.PracticClass.Duration30, price: classItem.PracticClass.Price30},
                    '60_min': {status: classItem.PracticClass.Duration60, price: classItem.PracticClass.Price60},
                    '90_min': {status: classItem.PracticClass.Duration90, price: classItem.PracticClass.Price90},
                    calendar: decode(classItem.PracticClass.Time)
                })
            if (classItem.TheoreticClass.ClassParentId === 0)
                setTheoryState({
                    active: false,
                    valid: false,
                    '15_min': {status: false, price: ''},
                    '30_min': {status: false, price: ''},
                    '60_min': {status: false, price: ''},
                    '90_min': {status: false, price: ''},
                    calendar: Array.from(Array(8), _ => Array(7).fill(0))
                })
            else
                setTheoryState({
                    active: true,
                    valid: true,
                    '15_min': {status: classItem.TheoreticClass.Duration15, price: classItem.TheoreticClass.Price15},
                    '30_min': {status: classItem.TheoreticClass.Duration30, price: classItem.TheoreticClass.Price30},
                    '60_min': {status: classItem.TheoreticClass.Duration60, price: classItem.TheoreticClass.Price60},
                    '90_min': {status: classItem.TheoreticClass.Duration90, price: classItem.TheoreticClass.Price90},
                    calendar: decode(classItem.TheoreticClass.Time)
                })

            if (classItem.KeyClass.ClassParentId === 0)
                setTurnkeyState({
                    active: false,
                    valid: false,
                    '15_min': {status: false, price: ''},
                    individual_term: {status: false, price: ''},
                    calendar: Array.from(Array(8), _ => Array(7).fill(0))
                })
            else {
                setTurnkeyState({
                    active: true,
                    valid: true,
                    '15_min': {status: classItem.KeyClass.Duration15, price: classItem.KeyClass.Price15},
                    individual_term: {status: classItem.KeyClass.FullTime, price: classItem.KeyClass.PriceFullTime},
                    calendar: decode(classItem.KeyClass.Time)
                })
            }
        }

    }, [activeItem])


    let decode = publicProfileStore.decode

    let [tags, setTags] = useState([])

    let [value, setValue] = useState('')


    let [form, setForm] = useState({name: '', description: ''})

    let [formFetching, setFormFetching] = useState(false)

    let changeForm = (key, value) => {
        let newForm = {...form}
        newForm[key] = value
        setForm(newForm)
    }

    let validate = (practiceState.valid || theoryState.valid || turnkeyState.valid) && form.name !== '' && form.description !== '' && tags.length > 0



    return (
        <div className={s.container}>
            <div className={s.display_container}>
                <div className={`${s.display_block} ${s.title_block}`}>
                    <div className={s.display_title}>Название</div>
                    <input type="text" className={s.input} placeholder={'Название'} value={form.name}
                           onChange={(event) => changeForm('name', event.target.value)}/>
                </div>
                <div className={`${s.display_block} ${s.description_block}`}>
                    <div className={s.display_title}>Описание</div>
                    <input type="text" className={s.input} placeholder={'Краткое описание вашего курса'}
                           value={form.description}
                           onChange={(event) => changeForm('description', event.target.value)}/>
                </div>
                <div className={`${s.display_block} ${s.tag_block}`}>
                    <div className={s.display_title}>Компетенции</div>
                    <TextareaCompetence value={value} changeValue={setValue} list={list} tags={tags} setTags={setTags}
                                        setValue={setValue}/>
                </div>
            </div>


            <div className={s.btns}>
                <NavLink to={`/edit-classes/theory-classes`}>
                    <div
                        className={`${s.mode_btn} ${location.pathname === '/edit-classes/theory-classes' ? s.active_mode_btn : ''}`}>
                        Теоретическая консультация
                    </div>
                </NavLink>
                <NavLink to={`/edit-classes/practice-classes`}>
                    <div
                        className={`${s.mode_btn} ${location.pathname === '/edit-classes/practice-classes' ? s.active_mode_btn : ''}`}>
                        Практическое решение текущих проблем
                    </div>
                </NavLink>
                <NavLink to={`/edit-classes/turnkey-lesson`}>
                    <div
                        className={`${s.mode_btn} ${location.pathname === '/edit-classes/turnkey-lesson' ? s.active_mode_btn : ''}`}>
                        Решение ‘под ключ’
                    </div>
                </NavLink>
            </div>

            <div className={s.work_container}>
                {
                    <Switch>
                        <Route path={`/edit-classes/theory-classes/`}>
                            <TheoryWorkPlace state={theoryState} setState={setTheoryState}/>
                        </Route>
                        <Route path={`/edit-classes/practice-classes`}>
                            <PracticeWorkPlace state={practiceState} setState={setPracticeState}/>
                        </Route>
                        <Route path={`/edit-classes/turnkey-lesson`}>
                            <TurnKeyWorkPlace state={turnkeyState} setState={setTurnkeyState}/>
                        </Route>
                        <Redirect to={'/edit-classes/theory-classes'}/>
                    </Switch>
                }
            </div>
            {<div className={`${s.save_btn_container} ${activeItem !== 0 ? s.update_container : ''}`}>
                <div className={s.save_btn}>
                    {formFetching && <Preloader/>}
                    <button className={s.submit_btn} disabled={!validate} onClick={() => {
                        setFormFetching(true)
                        //Редактировать занятие
                        if (activeItem !== 0) {
                            //Занятие на сервере
                            let classItem = classes.filter(x => x.ID === activeItem)[0]

                            myClassesStore.updateClass(classItem, form.name, form.description, tags, theoryState, practiceState, turnkeyState).then(x => {
                                setFormFetching(false)
                                let newClasses = [...classes]
                                let redClassIndex = newClasses.findIndex(x => x.ID === activeItem)
                                newClasses[redClassIndex] = {
                                    "ID": activeItem,
                                    "ParentId": authStore.user.id,
                                    "ClassName": form.name,
                                    "Description": form.description,
                                    "Tags": tags.map(x => {
                                        return {'ID': x}
                                    }),
                                    "TheoreticClass": {
                                        "ID": newClasses[redClassIndex].TheoreticClass.ID !== 0 ? newClasses[redClassIndex].TheoreticClass.ID : x.theory,
                                        "ClassParentId": theoryState.valid ? x : 0,
                                        "Duration15": theoryState["15_min"].status,
                                        "Price15": theoryState["15_min"].price,
                                        "Duration30": theoryState["30_min"].status,
                                        "Price30": theoryState["30_min"].price,
                                        "Duration60": theoryState["60_min"].status,
                                        "Price60": theoryState["60_min"].price,
                                        "Duration90": theoryState["90_min"].status,
                                        "Price90": theoryState["90_min"].price,
                                        "Time": [].concat(...theoryState.calendar).join('')
                                    },
                                    "PracticClass": {
                                        "ID": newClasses[redClassIndex].PracticClass.ID !== 0? newClasses[redClassIndex].PracticClass.ID: x.practice,
                                        "ClassParentId": practiceState.valid ? x : 0,
                                        "Duration15": practiceState["15_min"].status,
                                        "Price15": practiceState["15_min"].price,
                                        "Duration30": practiceState["30_min"].status,
                                        "Price30": practiceState["30_min"].price,
                                        "Duration60": practiceState["60_min"].status,
                                        "Price60": practiceState["60_min"].price,
                                        "Duration90": practiceState["90_min"].status,
                                        "Price90": practiceState["90_min"].price,
                                        "Time": [].concat(...practiceState.calendar).join('')
                                    },
                                    "KeyClass": {
                                        "ID": newClasses[redClassIndex].KeyClass.ID !== 0? newClasses[redClassIndex].KeyClass.ID:x.key,
                                        "ClassParentId": turnkeyState.valid ? x : 0,
                                        "Duration15": turnkeyState["15_min"].status,
                                        "Price15": turnkeyState["15_min"].price,
                                        "FullTime": turnkeyState.individual_term.status,
                                        "PriceFullTime": turnkeyState.individual_term.price,
                                        "Time": [].concat(...turnkeyState.calendar).join('')
                                    }
                                }
                                setClasses(newClasses)
                            })

                        }
                        //Создание занятия
                        else {
                            myClassesStore.createClass(form.name, form.description, tags, theoryState, practiceState, turnkeyState).then(x => {
                                setFormFetching(false)
                                let newClasses = [...classes]
                                newClasses.push({
                                    "ID": x.ID,
                                    "ParentId": authStore.user.id,
                                    "ClassName": form.name,
                                    "Description": form.description,
                                    "Tags": tags.map(x => {
                                        return {'ID': x}
                                    }),
                                    "TheoreticClass": {
                                        "ID": x.theory,
                                        "ClassParentId": theoryState.valid ? x : 0,
                                        "Duration15": theoryState["15_min"].status,
                                        "Price15": theoryState["15_min"].price,
                                        "Duration30": theoryState["30_min"].status,
                                        "Price30": theoryState["30_min"].price,
                                        "Duration60": theoryState["60_min"].status,
                                        "Price60": theoryState["60_min"].price,
                                        "Duration90": theoryState["90_min"].status,
                                        "Price90": theoryState["90_min"].price,
                                        "Time": [].concat(...theoryState.calendar).join('')
                                    },
                                    "PracticClass": {
                                        "ID": x.practice,
                                        "ClassParentId": practiceState.valid ? x : 0,
                                        "Duration15": practiceState["15_min"].status,
                                        "Price15": practiceState["15_min"].price,
                                        "Duration30": practiceState["30_min"].status,
                                        "Price30": practiceState["30_min"].price,
                                        "Duration60": practiceState["60_min"].status,
                                        "Price60": practiceState["60_min"].price,
                                        "Duration90": practiceState["90_min"].status,
                                        "Price90": practiceState["90_min"].price,
                                        "Time": [].concat(...practiceState.calendar).join('')
                                    },
                                    "KeyClass": {
                                        "ID": x.key,
                                        "ClassParentId": turnkeyState.valid ? x : 0,
                                        "Duration15": turnkeyState["15_min"].status,
                                        "Price15": turnkeyState["15_min"].price,
                                        "FullTime": turnkeyState.individual_term.status,
                                        "PriceFullTime": turnkeyState.individual_term.price,
                                        "Time": [].concat(...turnkeyState.calendar).join('')
                                    }

                                })
                                setClasses(newClasses)
                                setActiveItem(x.ID)
                            })
                        }
                    }}>
                        Сохранить
                    </button>
                    {activeItem !== 0 && <button className={s.delete_btn} onClick={() => {
                        setFormFetching(true)
                        myClassesStore.deleteClass(activeItem).then(x => {
                            setFormFetching(false)
                            let deltaClasses = classes.filter(x => x.ID !== activeItem)
                            setClasses(deltaClasses)
                            setActiveItem(0)
                        })
                    }}>Удалить занятие</button>}
                </div>
            </div>}
        </div>
    );
};

export default EditWorkPlace;