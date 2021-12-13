import React, {useEffect, useState} from 'react';
import s from '../../EditWorkPlace/EditWorkPlace.module.css'
import WorkDefaultScreen from "../WorkDefaultScreen/WorkDefaultScreen";
import CalendarPicker from "../../../../../../components/UI/CalendarPicker/CalendarPicker";
import Button from "../../../../../../components/UI/Button/Button";

const LessonWorkPlace = ({state, setState}) => {

    useEffect(() => {
        if ((state['15_min'].status && state['15_min'].price > 0
            || state['30_min'].status && state['30_min'].price > 0
            || state['60_min'].status && state['60_min'].price > 0
            || state['90_min'].status && state['90_min'].price > 0) && state.calendar.reduce((a,b) => a.concat(b) ) // flatten array
            .reduce((a,b) => a + b ) > 0) {
            if (!state.valid) {
                let newState = {...state}
                newState.valid = true
                setState(newState)
            }
        } else {
            if (state.valid) {
                let newState = {...state}
                newState.valid = false
                setState(newState)
            }
        }
    }, [state])

    let setDefaultScreen = (status) => {
        setState({...state, active: status})
    }

    if (!state.active) {
        return <WorkDefaultScreen setActive={setDefaultScreen}/>
    }

    let changeCheckbox = (name) => {
        let deltaState = {...state}
        deltaState[name].status = !deltaState[name].status
        setState(deltaState)
    }

    let changeText = (name, price) => {
        let deltaState = {...state}
        if (!isNaN(price))
            deltaState[name].price = price
        setState(deltaState)
    }

    let setCalendarState = (newCalendar) => {
        setState({...state, calendar: newCalendar})
    }


    return (
        <>
            <div className={s.workplace_container}>
                <table className={s.table}>
                    <tbody>
                    <tr>
                        <th className={s.title_table}>Длительность занятия</th>
                        <td><input type="checkbox" checked={state['15_min'].status}
                                   onChange={() => changeCheckbox('15_min')} id={'15_min'}/><label htmlFor="15_min"> 15 минут (пробное)</label>
                        </td>
                        <td><input type="checkbox" checked={state['30_min'].status}
                                   onChange={() => changeCheckbox('30_min')} id={'30_min'}/><label htmlFor="30_min"> 30 минут</label>
                        </td>
                        <td><input type="checkbox" checked={state['60_min'].status}
                                   onChange={() => changeCheckbox('60_min')} id={'60_min'}/><label htmlFor="60_min"> 60 минут</label>
                        </td>
                        <td><input type="checkbox" checked={state['90_min'].status}
                                   onChange={() => changeCheckbox('90_min')} id={'90_min'}/> <label htmlFor="90_min"> 90 минут</label>
                        </td>
                    </tr>
                    <tr>
                        <th className={s.title_table}>Стоимость занятий</th>
                        <td>
                            <input type="text" className={s.price_input} placeholder={'Сумма'}
                                   value={state['15_min'].price}
                                   onChange={(event) => changeText('15_min', event.target.value)}/></td>
                        <td>
                            <input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}
                                   value={state['30_min'].price}
                                   onChange={(event) => changeText('30_min', event.target.value)}/>
                        </td>
                        <td>
                            <input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}
                                   value={state['60_min'].price}
                                   onChange={(event) => changeText('60_min', event.target.value)}/>
                        </td>
                        <td>
                            <input type="text" className={`${s.price_input} ${s.little_input}`} placeholder={'Сумма'}
                                   value={state['90_min'].price}
                                   onChange={(event) => changeText('90_min', event.target.value)}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className={s.calendar_container}>
                    <div className={s.title_table}>Возможные часы занятий</div>
                    <CalendarPicker setCalendarState={setCalendarState} calendarState={state.calendar}/>
                </div>
            </div>

        </>
    );
};

export default LessonWorkPlace;