import React from 'react';
import s from '../../../styles/MyClassesItems.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import zoom from "../../../../../static/img/messenger_icons/zoom.png";
import {messengersIcons} from "../../../../PublicProfilesService/MentorProifle/ModalRegistrationLesson/MessengersIcons";
import myClassesStore from "../../../../../store/myClassesStore";
import {Link} from "react-router-dom";
import messageIcon from "../../../../../static/img/Search/message_icon.svg";

const PlannedItem = ({data, deleteItem}) => {

    let cancelItem = () => {
        myClassesStore.changeStatusClass(data.ID, 'canceled').then(x => deleteItem())
    }

    return (
        <div className={s.container}>
            <div className={s.title_container}>
                <div className={s.name_container}>
                    <div className={s.cube}/>
                    <div className={s.name}>{data.menti_first_name} {data.menti_second_name}</div>
                </div>
                <Link to={`/messages/${data.UserID}/stop-lesson?id=${data.ID}`}>
                    <button className={s.right_title_btn}>Прекратить занятия</button>
                </Link>
            </div>
            <div className={s.tag_container}>
                {data.tags.map(x => <Tag title={x}/>)}
            </div>
            <div>
                <div className={s.text}>Тип занятия: {data.typeName}</div>
                <div className={s.text}>Детали занятия: {data.details}</div>
                <div className={s.text}>Расписание:</div>
            </div>
            <div className={s.schedule_container}>
                <div className={s.schedule}>
                    {data.fixedTime.map((x, index) => {
                        let time = data.Time[index].Time.split(' ')[0]
                        let timeDate = new Date(time)
                        let strTimeDate = `${timeDate.getDate()}/${timeDate.getMonth()}/${timeDate.getFullYear()}`
                        let nowDate = new Date()
                        let strNowDate = `${nowDate.getDate()}/${nowDate.getMonth()}/${nowDate.getFullYear()}`
                        let deltaClass = ''

                        if (strNowDate === strTimeDate) {
                            deltaClass = s.schedule_now
                        } else if (nowDate > timeDate) {
                            deltaClass = s.schedule_past
                        }

                        return <div className={`${s.schedule_item} ${deltaClass}`}>
                            <div>{x.name}</div>
                            <div>{x.time}</div>
                        </div>
                    })}
                </div>
                <Link to={`/messages/${data.UserID}/change-lessons-dates?id=${data.ID}`}>
                    <button className={s.right_title_btn}>Предложить другое время</button>
                </Link>
            </div>
            <div className={s.text}>Способ связи:</div>
            <div className={s.communication_price_container}>
                <Link
                    to={`/messages/${data.UserID}/change-communication?class_id=${data.ID}&active_item=${data.Communication}`}>
                    <div className={`${s.communication_container} ${s.communication_container_mentee}`}>
                        <div className={s.communication_name_container}>
                            <img
                                src={messengersIcons[data.messenger_name]}
                                className={s.communication_image}
                                alt=""
                            />
                            <div className={s.communication_name}>{data.messenger_name}</div>
                        </div>
                        <div className={s.communication_user_id}/>
                    </div>
                </Link>
                <div className={s.price}>
                    {data.Price} руб.
                </div>
            </div>
            <div className={s.under_container}>
                <div>Время пользователя {data.user_time}</div>
                <div className={`${s.button_containers} ${s.button_containers_v2}`}>
                    <Link className={s.chat_btn} to={`/messages/${data.UserID}`}>
                        <img style={{
                            marginRight: '8px'
                        }} src={messageIcon} alt=""/>

                        <div>Сообщение</div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PlannedItem;