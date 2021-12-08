import React from 'react';
import s from './EditWorkPlace.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import Button from "../../../../../components/UI/Button/Button";
import {Switch, Route, useLocation, NavLink, Redirect} from "react-router-dom";
import authStore from "../../../../../store/authStore";
import LessonWorkPlace from "./LessonWorkPlace/LessonWorkPlace";
import TurnKeyWorkPlace from "./TurnKeyWorkPlace/TurnKeyWorkPlace";

const EditWorkPlace = () => {
    let location = useLocation()
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
                    <div className={s.display_title}>Название</div>
                    <div className={s.textarea_container}>
                        <div className={s.tags}></div>
                        <textarea className={s.textarea} placeholder={'Выберите то, чему будете учить'}>

                        </textarea>
                        <div className={s.count_tag}>0 / 3</div>
                    </div>
                </div>
            </div>


            <div className={s.btns}>
                <NavLink to={`/edit-classes/theory-classes`}>
                    <div className={`${s.mode_btn} ${location.pathname === '/edit-classes/theory-classes'? s.active_mode_btn : ''}`}>
                        Теоретическая консультация
                    </div>
                </NavLink>
                <NavLink to={`/edit-classes/practice-classes`}>
                    <div className={`${s.mode_btn} ${location.pathname === '/edit-classes/practice-classes'? s.active_mode_btn : ''}`}>
                        Практическое решение текущих проблем
                    </div>
                </NavLink>
                <NavLink to={`/edit-classes/turnkey-lesson`}>
                    <div className={`${s.mode_btn} ${location.pathname === '/edit-classes/turnkey-lesson'? s.active_mode_btn : ''}`}>
                        Решение ‘под ключ’
                    </div>
                </NavLink>
            </div>

            <div className={s.work_container}>
                <Switch>
                    <Route path={`/edit-classes/theory-classes`}>
                        <LessonWorkPlace />
                    </Route>
                    <Route path={`/edit-classes/practice-classes`}>
                        <LessonWorkPlace />
                    </Route>
                    <Route path={`/edit-classes/turnkey-lesson`}>
                        <TurnKeyWorkPlace />
                    </Route>
                    <Redirect to={'/edit-classes/theory-classes'}/>
                </Switch>
            </div>

        </div>
    );
};

export default EditWorkPlace;