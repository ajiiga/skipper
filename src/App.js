import React from 'react'
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Redirect, Switch} from "react-router-dom";
import s from './App.module.css'
import Login from "./components/pages/Login/Login";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header isAuth={false} profile={{name: 'Азамат Мусагалиев', status: 'ментор'}}/>
                <div className={s.container}>
                    <Switch>
                        <Route path={'/login'}>
                            <Login />
                        </Route>
                        <Route path={'/registration'}>
                            registration
                        </Route>
                        <Redirect to={'/login'}/>
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
