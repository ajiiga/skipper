import React from 'react';
import s from "../../styles/MyClasses.module.css";
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import {Link, Redirect, Route, Switch, useLocation} from "react-router-dom";
import ConsiderationItems from "./ConsiderationItems/ConsiderationItems";
import PlannedItems from "./PlannedItems/PlannedItems";
import CompletedItems from "./ CompletedItems/CompletedItems";
import CanceledItems from "./CanceledItems/CanceledItems";


const MyClassesMentee = () => {
    let location = useLocation()

    return (
        <div className={s.container}>
            <MiniNavBar child={'Мои занятия'}/>
            <div className={s.content_container}>
                <div className={s.title_buttons}>
                    <Link className={`${s.title_btn_mentee} ${location.pathname === '/my-classes-mentee/consideration' ? s.active_title_btn : ''}`} to={'/my-classes-mentee/consideration'}><div>На рассмотрении</div></Link>
                    <Link className={`${s.title_btn_mentee} ${location.pathname === '/my-classes-mentee/planned' ? s.active_title_btn : ''}`} to={'/my-classes-mentee/planned'}><div>Запланированные</div></Link>
                    <Link className={`${s.title_btn_mentee} ${location.pathname === '/my-classes-mentee/completed' ? s.active_title_btn : ''}`} to={'/my-classes-mentee/completed'}><div>Завершенные</div></Link>
                    <Link className={`${s.title_btn_mentee} ${location.pathname === '/my-classes-mentee/canceled' ? s.active_title_btn : ''}`} to={'/my-classes-mentee/canceled'}><div>Отмененнные</div></Link>
                </div>
                <Switch>
                    <Route path={'/my-classes-mentee/consideration'}>
                        <ConsiderationItems />
                    </Route>
                    <Route path={'/my-classes-mentee/planned'}>
                        <PlannedItems />
                    </Route>
                    <Route path={'/my-classes-mentee/completed'}>
                        <CompletedItems />
                    </Route>
                    <Route path={'/my-classes-mentee/canceled'}>
                        <CanceledItems />
                    </Route>
                    <Redirect to={'/my-classes-mentee/consideration'}/>
                </Switch>
            </div>
        </div>
    );
};

export default MyClassesMentee;