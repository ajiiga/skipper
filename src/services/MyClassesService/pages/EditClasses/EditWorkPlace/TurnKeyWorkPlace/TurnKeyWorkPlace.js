import React, {useState} from 'react';
import WorkDefaultScreen from "../WorkDefaultScreen/WorkDefaultScreen";
import s from "../EditWorkPlace.module.css";
import CalendarPicker from "../../../../../../components/UI/CalendarPicker/CalendarPicker";
import Button from "../../../../../../components/UI/Button/Button";

const TurnKeyWorkPlace = () => {
    let [defaultScreen, setDefaultScreen] = useState(true)

    if (defaultScreen) {
        return <WorkDefaultScreen setActive={setDefaultScreen}/>
    }
    return (
        <>
            <div className={s.workplace_container}>
                <table className={s.table}>
                    <tr>
                        <th className={s.title_table}>Длительность занятия</th>
                        <td><input type="checkbox"/> 15 минут (пробное)</td>
                        <td><input type="checkbox"/> Индивидуальный срок</td>
                    </tr>
                    <tr>
                        <th className={s.title_table}>Стоимость занятий</th>
                        <td><input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}/>
                        </td>
                        <td><input type="text" className={`${s.price_input} ${s.little_input}`}
                                   placeholder={'Минимальная сумма'}/></td>
                    </tr>
                </table>
                <div className={s.calendar_container}>
                    <div className={s.title_table}>Возможные часы занятий</div>
                    <CalendarPicker/>
                </div>
            </div>
            <div className={s.save_btn_container}>
                <div className={s.save_btn}>
                    <Button title={'Сохранить'}/>
                </div>
            </div>

        </>
    );
};

export default TurnKeyWorkPlace;