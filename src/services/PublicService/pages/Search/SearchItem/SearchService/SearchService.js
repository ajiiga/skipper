import React from 'react';
import s from './SearchService.module.css'
import Tag from "../../../../../../components/UI/Tag/Tag";
import arrow from '../../../../../../static/img/Search/arrow.svg'

const SearchService = ({name, tags}) => {
    return (
        <div className={s.container}>
            <div>
                <div className={s.title_container}>
                    <div className={s.title}>{name}</div>
                    {tags.map(x =><div key={x} className={s.tag_container}><Tag title={x}/></div>)}
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