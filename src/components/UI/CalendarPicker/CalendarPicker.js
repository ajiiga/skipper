import React, {useState} from 'react';
import s from "./CalendarPicker.module.css";

const CalendarPicker = ({calendarState, setCalendarState}) => {
    return (
        <div className={s.content_container}>
            <div className={s.times}>
                <div className={s.time}>00:00-03:00</div>
                <div className={s.time}>03:00-06:00</div>
                <div className={s.time}>06:00-09:00</div>
                <div className={s.time}>09:00-12:00</div>
                <div className={s.time}>12:00-15:00</div>
                <div className={s.time}>15:00-18:00</div>
                <div className={s.time}>18:00-21:00</div>
                <div className={s.time}>21:00-24:00</div>
            </div>
            <div className={s.content}>
                <div className={s.title_content}>
                    <div>
                        ПН
                    </div>
                    <div>
                        ВТ
                    </div>
                    <div>
                        СР
                    </div>
                    <div>
                        ЧТ
                    </div>
                    <div>
                        ПТ
                    </div>
                    <div>
                        СБ
                    </div>
                    <div>
                        ВС
                    </div>
                </div>
                <div>
                    <div className={s.calendar}>

                        {
                            calendarState.map((week, i) =>
                            (<div className={s.content_blocks}>
                                {
                                    week.map((day, j) => <div className={`${s.content_block} ${day === 1 ? s.free_content_block : ''}`} onClick={() => {
                                        let deltaCalendarState = [...calendarState]
                                        deltaCalendarState[i][j] = deltaCalendarState[i][j]  === 1 ? 0 : 1
                                        setCalendarState(deltaCalendarState)
                                    }
                                    }/>)
                                }
                            </div>))
                        }

                    </div>
                    <div className={s.example_display}>
                        <span className={s.free_example}/> - есть возможность записи <span
                        className={s.busy_example}/> - запись ограничена
                    </div>
                </div>

            </div>

        </div>
    );
};

export default CalendarPicker;