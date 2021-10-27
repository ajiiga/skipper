import React from 'react';
import s from './MiniNavBar.module.css'
import {Link} from "react-router-dom";

const MiniNavBar = ({child}) => {
    return (
        <div className={s.container}>
            <Link to={'/'}><div className={s.main_url}>Главная</div></Link>
            <div className={s.line_between}/>
            <div className={s.child_url}>{child}</div>
        </div>
    );
};

export default MiniNavBar;