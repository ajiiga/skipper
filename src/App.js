import React from 'react'
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import s from './App.module.css'
import Login from "./components/pages/Login/Login";
import Registration from "./components/pages/Registration/Registration";
import {observer} from "mobx-react-lite";
import authStore from "./store/authStore";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header isAuth={authStore.isAuth} profile={{name: 'Азамат Мусагалиев', status: 'ментор'}}/>
                <div className={s.container}>
                    <Switch>
                        <Route path={'/login'}>
                            <Login />
                        </Route>
                        <Route path={'/registration'}>
                            <Registration />
                        </Route>
                        <Redirect to={'/login'}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
