import React from 'react';
import s from './SearchService.module.css'
import Tag from "../../../../../../components/UI/Tag/Tag";
import arrow from '../../../../../../static/img/Search/arrow.svg'
import {useHistory} from 'react-router-dom'

const SearchService = ({name, description, tags, id, service_id}) => {
    let history=useHistory()
    return (
        <div className={s.container} onClick={() => {history.push(`/mentor-profile/${id}/${service_id}`)}}>
            <div>
                <div className={s.title_container}>
                    <div className={s.title}>{name}</div>
                    {tags.map(x =><div key={x} className={s.tag_container}><Tag title={x}/></div>)}
                </div>
                <div className={s.description}>
                    {description}
                </div>
            </div>
            <img src={arrow} alt=""/>
        </div>
    );
};

export default SearchService;