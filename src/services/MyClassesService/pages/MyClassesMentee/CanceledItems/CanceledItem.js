import React from 'react';
import s from '../../../styles/MyClassesItems.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import zoom from "../../../../../static/img/messenger_icons/zoom.png";

const CanceledItem = () => {
    return (
        <div className={s.container}>
            <div className={s.title_container}>
                <div className={s.name_container}>
                    <div className={s.cube}/>
                    <div className={s.name}>Илья Мерлицкий</div>
                </div>
                <button className={s.right_title_btn}>Удалить</button>
            </div>
            <div className={s.tag_container}>
                <Tag title={'React'}/>
                <Tag title={'Angular'}/>
                <Tag title={'Мобильная разработка'}/>
            </div>
            <div>
                <div className={s.text}>Тип занятия: Практическое решение текущих проблем</div>
                <div className={s.text}>Детали занятия: 5 занятий по 30 минут</div>
                <div className={s.text}>Расписание:</div>
            </div>
            <div className={s.schedule_container}>
                <div className={s.schedule}>
                    <div className={s.schedule_item}>
                        <div>октябрь 12</div>
                        <div>10:00</div>
                    </div>
                    <div className={s.schedule_item}>
                        <div>октябрь 12</div>
                        <div>10:00</div>
                    </div>
                    <div className={s.schedule_item}>
                        <div>октябрь 12</div>
                        <div>10:00</div>
                    </div>
                    <div className={s.schedule_item}>
                        <div>октябрь 12</div>
                        <div>10:00</div>
                    </div>
                    <div className={s.schedule_item}>
                        <div>октябрь 12</div>
                        <div>10:00</div>
                    </div>
                </div>
                <button className={s.right_title_btn}>Предложить другое время</button>
            </div>
            <div className={s.text}>Способ связи:</div>
            <div className={s.communication_price_container}>
                <div className={`${s.communication_container} ${s.communication_container_mentee}`}>
                    <div className={s.communication_name_container}>
                        <img src={zoom} className={s.communication_image} alt=""/>
                        <div className={s.communication_name}>Zoom</div>
                    </div>
                    <div className={s.communication_user_id}/>
                </div>
                <div className={s.price}>
                    3800 руб.
                </div>
            </div>
            <div className={s.under_container}>
                <div>Время пользователя 07:45 | GMT+4</div>
                <div className={`${s.button_containers} ${s.button_containers_v2}`}>
                    <button className={s.chat_btn}>Чат</button>
                </div>
            </div>
        </div>
    );
};

export default CanceledItem;