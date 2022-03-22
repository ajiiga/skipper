import React from 'react';
import s from '../../../styles/MyClassesItems.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import zoom from "../../../../../static/img/messenger_icons/zoom.png";
import {messengersIcons} from "../../../../PublicProfilesService/MentorProifle/ModalRegistrationLesson/MessengersIcons";

const CompletedItem = ({data}) => {
    return (
        <div className={s.container}>
            <div className={s.title_container}>
                <div className={s.name_container}>
                    <div className={s.cube}/>
                    <div className={s.name}>{data.menti_first_name} {data.menti_second_name}</div>
                </div>
                <button className={s.right_title_btn_v2}>Удалить</button>
            </div>
            <div className={s.tag_container}>
                <Tag title={'React'}/>
                <Tag title={'Angular'}/>
                <Tag title={'Мобильная разработка'}/>
            </div>
            <div>
                <div className={s.text}>Тип занятия: {data.typeName}</div>
                <div className={s.text}>Детали занятия: {data.details}</div>
                <div className={s.text}>Расписание:</div>
            </div>
            <div className={s.schedule_container}>
                <div className={s.schedule}>
                    {data.fixedTime.map(x => <div className={`${s.schedule_item} ${s.schedule_past}`}>
                        <div>{x.name}</div>
                        <div>{x.time}</div>
                    </div>)}
                </div>
            </div>
            <div className={s.text}>Способ связи:</div>
            <div className={s.communication_price_container}>
                <div className={s.communication_container}>
                    <div className={s.communication_name_container}>
                        <img src={messengersIcons[data.messenger_name]} className={s.communication_image} alt=""/>
                        <div className={s.communication_name}>Zoom</div>
                    </div>
                    <div className={s.communication_user_id}>User id: bolshoyPapochka93</div>
                </div>
                <div className={s.price}>
                    {data.Price} руб.
                </div>
            </div>
            <div className={s.under_container}>
                <div>{data.user_time}</div>
                <div className={`${s.button_containers} ${s.button_containers_v3}`}>
                    <button className={s.chat_btn}>Чат</button>
                    <button className={s.confirm_btn}>Оставить отзыв</button>
                </div>
            </div>
        </div>
    );
};

export default CompletedItem;