import React, {useState} from 'react';
import s from './EditWorkPlace.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import Button from "../../../../../components/UI/Button/Button";
import {Switch, Route, useLocation, NavLink, Redirect} from "react-router-dom";
import authStore from "../../../../../store/authStore";
import LessonWorkPlace from "./LessonWorkPlace/LessonWorkPlace";
import TurnKeyWorkPlace from "./TurnKeyWorkPlace/TurnKeyWorkPlace";
import WorkDefaultScreen from "./WorkDefaultScreen/WorkDefaultScreen";
import PracticeWorkPlace from "./PracticeWorkPlace/PracticeWorkPlace";
import TheoryWorkPlace from "./TheoryWorkPlace/TheoryWorkPlace";
import TextareaCompetence from "./TextareaCompetence/TextareaCompetence";

const EditWorkPlace = () => {
    let location = useLocation()

    let [practiceState, setPracticeState] = useState({
        active: false,
        '15_min': {status: false, price: ''},
        '30_min': {status: false, price: ''},
        '60_min': {status: false, price: ''},
        '90_min': {status: false, price: ''},
        calendar: Array.from(Array(8), _ => Array(7).fill(0))
    })
    let [theoryState, setTheoryState] = useState({
        active: false,
        '15_min': {status: false, price: ''},
        '30_min': {status: false, price: ''},
        '60_min': {status: false, price: ''},
        '90_min': {status: false, price: ''},
        calendar: Array.from(Array(8), _ => Array(7).fill(0))
    })
    let [turnkeyState, setTurnkeyState] = useState({
        active: false,
        '15_min': {status: false, price: ''},
        individual_term: {status: false, price: ''},
        calendar: Array.from(Array(8), _ => Array(7).fill(0))
    })

    let [tags, setTags] = useState([])

    let [value, setValue] = useState('')

    let list = ['js', 'python', 'django', 'react', 'angular', 'vue', 'go', 'sql', 'postgresql', 'CSS', 'HTML', 'php', 'laravel', 'c#', 'ASP.NET', 'flask', 'nodejs']

    return (
        <div className={s.container}>
            <div className={s.display_container}>
                <div className={`${s.display_block} ${s.title_block}`}>
                    <div className={s.display_title}>Название</div>
                    <input type="text" className={s.input} placeholder={'Название'}/>
                </div>
                <div className={`${s.display_block} ${s.description_block}`}>
                    <div className={s.display_title}>Описание</div>
                    <input type="text" className={s.input} placeholder={'Краткое описание вашего курса'}/>
                </div>
                <div className={`${s.display_block} ${s.tag_block}`}>
                    <div className={s.display_title}>Компетенции</div>
                    <TextareaCompetence value={value} changeValue={setValue} list={list} tags={tags} setTags={setTags} setValue={setValue} />
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
                        <Route path={`/edit-classes/theory-classes`}>
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
            {<div className={s.save_btn_container}>
                <div className={s.save_btn}>
                    <button className={`${s.submit_btn} ${(practiceState.active || theoryState.active || turnkeyState.active)? '' : s.deactive}`}>
                        Сохранить
                    </button>
                </div>
            </div>}
        </div>
    );
};

export default EditWorkPlace;