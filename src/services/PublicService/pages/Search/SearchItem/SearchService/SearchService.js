import React from 'react';
import s from './SearchService.module.css'
import Tag from "../../../../../../components/UI/Tag/Tag";
import arrow from '../../../../../../static/img/Search/arrow.svg'
import {useHistory} from 'react-router-dom'
import authStore from "../../../../../../store/authStore";

const SearchService = ({name, description, tags, id, service_id, blocked}) => {
    const width =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;

    let history = useHistory()

    const onClick = () => {
        if (!authStore.isAuth) {
            history.push('/login')
        } else {
            history.push(`/mentor-profile/${id}/${service_id}`)
        }
    }

    if (blocked) {
        return (
            <div className={s.container}>
                <div>
                    <div className={s.title_container}>
                        <div className={s.title}>{name}</div>
                        {width > 500 ? tags.map(x => <div key={x} className={s.tag_container}><Tag title={x}/>
                        </div>) : tags.slice(0, 1).map(x => <div key={x} className={s.tag_container}><Tag title={x}/>
                        </div>)}
                    </div>
                    <div className={s.description}>
                        {description}
                    </div>
                </div>
                <img src={arrow} alt=""/>
            </div>
        )
    }
    return (
        <div className={s.container} onClick={() => {
            onClick()
        }}>
            <div>
                <div className={s.title_container}>
                    <div className={s.title}>{name}</div>
                    {width > 500 ? tags.map(x => <div key={x} className={s.tag_container}><Tag title={x}/>
                    </div>) : tags.slice(0, 1).map(x => <div key={x} className={s.tag_container}><Tag title={x}/>
                    </div>)}
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