import React from 'react';
import s from './SearchService.module.css'
import Tag from "../../../../../../components/UI/Tag/Tag";
import arrow from '../../../../../../static/img/Search/arrow.svg'

const SearchService = () => {
    return (
        <div className={s.container}>
            <div>
                <div className={s.title_container}>
                    <div className={s.title}>Консультация React</div>
                    <Tag title={'React'}/>
                </div>
                <div className={s.description}>
                    Решение профильных вопросов в устной форме
                </div>
            </div>
            <img src={arrow} alt=""/>
        </div>
    );
};

export default SearchService;