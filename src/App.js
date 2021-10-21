import React, {useEffect} from 'react'
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import s from './App.module.css'
import Login from "./services/AuthService/pages/Login/Login";
import Registration from "./services/AuthService/pages/Registration/Registration";
import {observer} from "mobx-react-lite";
import authStore from "./store/authStore";
import Footer from "./components/Footer/Footer";
import AuthService from "./services/AuthService/AuthService";
import PublicService from "./services/PublicService/PublicService";

function App() {
    // useEffect(() => {
    //     authStore.checkStatus()
    // }, [])

    if (authStore.isInitialisation)
        return (<div>Loading...</div>)
    return (
        <BrowserRouter>
            <div className="App">
                <Header isAuth={authStore.isAuth} profile={{name: 'Азамат Мусагалиев', status: 'ментор'}}/>
                <div className={s.container}>
                    <Switch>
                        {AuthService.urls.map(route => <Route exact={route.exact} path={route.path} component={route.component} />)}
                        {PublicService.urls.map(route => <Route exact={route.exact} path={route.path} component={route.component} />)}
                        <Redirect to={authStore.isAuth ? '/' : '/login'}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
