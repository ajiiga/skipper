import React from 'react';
import s from '../../styles/MyClasses.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import {Link, useLocation, Switch, Route, Redirect} from "react-router-dom";
import ConsiderationItems from "./ConsiderationItems/ConsiderationItems";
import PlannedItem from "./PlannedItems/PlannedItem";
import PlannedItems from "./PlannedItems/PlannedItems";
import CompletedItems from "./ CompletedItems/CompletedItems";
import CanceledItems from "./CanceledItems/CanceledItems";

const MyClassesMentor = () => {
    let location = useLocation()

    console.log('location', location)


    return (
        <div className={s.container}>
            <MiniNavBar child={'Мои занятия'}/>
            <div className={s.content_container}>
                <div className={s.title_buttons}>
                    <Link className={`${s.title_btn} ${location.pathname === '/my-classes-mentor/consideration' ? s.active_title_btn : ''}`} to={'/my-classes-mentor/consideration'}><div>На рассмотрении</div></Link>
                    <Link className={`${s.title_btn} ${location.pathname === '/my-classes-mentor/planned' ? s.active_title_btn : ''}`} to={'/my-classes-mentor/planned'}><div>Запланированные</div></Link>
                    <Link className={`${s.title_btn} ${location.pathname === '/my-classes-mentor/completed' ? s.active_title_btn : ''}`} to={'/my-classes-mentor/completed'}><div>Завершенные</div></Link>
                    <Link className={`${s.title_btn} ${location.pathname === '/my-classes-mentor/canceled' ? s.active_title_btn : ''}`} to={'/my-classes-mentor/canceled'}><div>Отмененнные</div></Link>
                    <Link to={'/edit-classes'} className={s.link_container}>
                        <div className={s.create_classes}>
                            Мои занятия +
                        </div>
                    </Link>
                </div>
                <Switch>
                    <Route path={'/my-classes-mentor/consideration'}>
                        <ConsiderationItems />
                    </Route>
                    <Route path={'/my-classes-mentor/planned'}>
                        <PlannedItems />
                    </Route>
                    <Route path={'/my-classes-mentor/completed'}>
                        <CompletedItems />
                    </Route>
                    <Route path={'/my-classes-mentor/canceled'}>
                        <CanceledItems />
                    </Route>
                    <Redirect to={'/my-classes-mentor/consideration'}/>
                </Switch>
            </div>
        </div>
    );
};

export default MyClassesMentor;