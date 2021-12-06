import React from 'react';
import s from './MiniNavBar.module.css'
import {Link, NavLink} from "react-router-dom";

const MiniNavBar = ({child, secondChild, secondUrl}) => {
    if (!secondChild) {
        return (
            <div className={s.container}>
                <Link to={'/'}>
                    <div className={s.main_url}>Главная</div>
                </Link>
                <div className={s.line_between}/>
                <div className={s.child_url}>{child}</div>
            </div>
        );
    }
    return (<div className={s.container}>
        <Link to={'/'}>
            <div className={s.main_url}>Главная</div>
        </Link>
        <div className={s.line_between}/>
        <NavLink to={secondUrl}><div className={s.child_url}>{child}</div></NavLink>
        <div className={s.line_between}/>
        <div className={s.child_url}>{secondChild}</div>
    </div>);
};

export default MiniNavBar;