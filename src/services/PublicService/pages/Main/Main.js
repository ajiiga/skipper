import React, {useState} from 'react';
import s from '../../styles/Main.module.css'
import img from '../../../../static/img/Main/main.svg'
import search_icon from '../../../../static/img/Main/search_icon.png'

const Main = () => {
    let [searchQuery, setSearchQuery] = useState('')

    return (
        <div className={s.container}>
            <div className={s.content_container}>
                <div className={s.left_side}>
                    <h1 className={s.title}>Чему бы вы хотели  <span className={s.learn_text}>научиться</span> сегодня?</h1>
                    <div className={s.input_container}>
                        <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} type="text" className={s.input} placeholder={'Тема консультации'}/>
                        <img className={s.search_icon} src={search_icon} alt=""/>
                    </div>
                </div>
                <img src={img} alt=""/>
            </div>
            <div></div>
        </div>
    );
};

export default Main;