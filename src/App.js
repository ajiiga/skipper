import React, {useEffect} from 'react'
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import s from './App.module.css'
import {observer} from "mobx-react-lite";
import authStore from "./store/authStore";
import Footer from "./components/Footer/Footer";
import AuthService from "./services/AuthService/AuthService";
import PublicService from "./services/PublicService/PublicService";
import Preloader from "./components/UI/Preloader/Preloader";

function App() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            authStore.checkAuth()
            authStore.checkStatus()
        }
        else {
            authStore.setIsInitialisation(false)
        }
    }, [])

    if (authStore.isInitialisation)
        return (<Preloader />)
    return (
        <BrowserRouter>
            <div className="App">
                <Header isAuth={authStore.isAuth} profile={{name: 'Азамат Мусагалиев', status: 'ментор'}}/>
                <div className={s.container}>
                    <Switch>
                        {!authStore.isAuth && AuthService.urls.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        {authStore.isAuth && !authStore.mentor && AuthService.urls.filter(page => page.path === '/mentor_registration').map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        {PublicService.urls.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        <Redirect to={authStore.isAuth ? '/' : '/login'}/>
                    </Switch>
                </div>
                <Footer/>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
