import React from 'react';
import s from '../../../styles/MyClassesItems.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import zoom from '../../../../../static/img/messenger_icons/zoom.png'
import myClassesStore from "../../../../../store/myClassesStore";
import {messengersIcons} from "../../../../PublicProfilesService/MentorProifle/ModalRegistrationLesson/MessengersIcons";
import {Link} from "react-router-dom";

const ConsiderationItem = ({data, deleteItem}) => {

    let rejectClass = () => {
        myClassesStore.changeStatusClass(data.ID, 'canceled').then(x => deleteItem())
    }

    let confirmClass = () => {
        myClassesStore.changeStatusClass(data.ID, 'planned').then(x => deleteItem())
    }


    return (
        <div className={s.container}>
            <div className={s.title_container}>
                <div className={s.name_container}>
                    <div className={s.cube}/>
                    <div className={s.name}>{data.menti_first_name} {data.menti_second_name}</div>
                </div>
                <Link to={`/messages/${data.MentiId}/reject-lesson?id=${data.ID}`}><button className={s.right_title_btn}>Отклонить</button></Link>
            </div>
            <div className={s.tag_container}>
                {data.tags.map(x => <Tag title={x} />)}
            </div>
            <div>
                <div className={s.text}>Тип занятия: {data.typeName}</div>
                <div className={s.text}>Детали занятия: {data.details}</div>
                <div className={s.text}>Расписание:</div>
            </div>
            <div className={s.schedule_container}>
                <div className={s.schedule}>
                    {data.fixedTime.map(x => <div className={s.schedule_item}>
                        <div>{x.name}</div>
                        <div>{x.time}</div>
                    </div>)}
                </div>
                <Link to={`/messages/${data.MentiId}/change-lessons-dates?id=${data.ID}`}><button className={s.right_title_btn}>Предложить другое время</button></Link>
            </div>
            <div className={s.text}>Способ связи:</div>
            <div className={s.communication_price_container}>
                <div className={s.communication_container}>
                    <div className={s.communication_name_container}>
                        <img src={messengersIcons[data.messenger_name]} className={s.communication_image} alt=""/>
                        <div className={s.communication_name}>{data.messenger_name}</div>
                    </div>
                    <div className={s.communication_user_id}>User id: {data.communication_login}</div>
                </div>
                <div className={s.price}>
                    {data.Price} руб.
                </div>
            </div>
            <div className={s.under_container}>
                <div>Время пользователя {data.user_time}</div>
                <div className={s.button_containers}>
                    <Link className={s.chat_btn} to={`/messages/${data.MentiId}`}><button style={{cursor: 'pointer',border: 0, background: 'rgba(0, 0, 0, 0)', fontWeight: 'bold'}}>Чат</button></Link>
                    <button className={s.confirm_btn} onClick={() => confirmClass()}>Принять</button>
                </div>
            </div>
        </div>
    );
};

export default ConsiderationItem;