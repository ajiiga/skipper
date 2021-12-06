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
import PrivateProfileService from "./services/PrivateProfileService/PrivateProfileService";
import PublicProfilesService from "./services/PublicProfilesService/PublicProfilesService";
import MyClassesService from "./services/MyClassesService/MyClassesService";

function App() {
    useEffect(() => {
        if (localStorage.getItem('token')) {
            authStore.initializationApp()
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
                <Header isAuth={authStore.isAuth} profile={authStore.user}/>
                <div className={s.container}>
                    <Switch>
                        {!authStore.isAuth && AuthService.urls.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        {authStore.isAuth && !authStore.user?.is_mentor && AuthService.urls.filter(page => page.path === '/mentor_registration').map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        {PublicService.urls.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        {authStore.isAuth && PrivateProfileService.urls.map(route => <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />)}
                        {PublicProfilesService.map(route => <Route key={route.path} exact={route.exact} component={route.component} path={route.path}/>)}
                        {authStore.isAuth && authStore.user?.is_mentor && MyClassesService.filter(x => x.for_mentor).map(route => <Route key={route.path} exact={route.exact} component={route.component} path={route.path}/>)}
                        <Redirect to={authStore.isAuth ? '/' : '/login'}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default observer(App);
