import React, {useState} from 'react';
import s from '../../EditWorkPlace/EditWorkPlace.module.css'
import WorkDefaultScreen from "../WorkDefaultScreen/WorkDefaultScreen";
import CalendarPicker from "../../../../../../components/UI/CalendarPicker/CalendarPicker";
import Button from "../../../../../../components/UI/Button/Button";

const LessonWorkPlace = () => {
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
                        <td><input type="checkbox"/> 30 минут</td>
                        <td><input type="checkbox"/> 60 минут</td>
                        <td><input type="checkbox"/> 90 минут</td>
                    </tr>
                    <tr>
                        <th className={s.title_table}>Стоимость занятий</th>
                        <td><input type="text" className={s.price_input} placeholder={'Сумма'}/></td>
                        <td><input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}/>
                        </td>
                        <td><input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}/>
                        </td>
                        <td><input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}/>
                        </td>
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

export default LessonWorkPlace;