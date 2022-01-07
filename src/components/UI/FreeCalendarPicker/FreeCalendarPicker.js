import React, {useEffect, useState} from 'react';
import s from "./FreeCalendarPicker.module.css";
import arrow from '../../../static/img/FreeTimeCalendar/arrow.svg'

const FreeCalendarPicker = ({calendarState, setCalendarState, dates, setDates, defaultState, activeCount}) => {

    let [numWeek, setNumWeek] = useState(0)
    let months = [
        'Январь',
        'Февраль',
        'Март',
        'Апрель',
        'Май',
        'Июнь',
        'Июль',
        'Август',
        'Сентябрь',
        'Октябрь',
        'Ноябрь',
        'Декабрь'
    ]

    let todayDate = new Date()

    todayDate.setDate(todayDate.getDate() + numWeek * 7)

    function getMonday(d) {
        d = new Date(d);
        let day = d.getDay(),
            diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        let newDate = new Date(d.setDate(diff));
        return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate())

    }

    function getSunday(monday) {
        let delta = monday
        delta.setDate(delta.getDate() + 6);
        return delta
    }

    function nextWeek(numberWeek) {
        setNumWeek(numberWeek + 1)
    }

    function prevWeek(numberWeek) {
        if (numberWeek > 0)
            setNumWeek(numberWeek - 1)
    }


    let monday = getMonday(todayDate)

    let sunday = getSunday(new Date(monday))

    useEffect(() => {
        let defState = [...defaultState]

        if (numWeek === 0) {
            let yBorder = todayDate.getDay()
            yBorder = yBorder == 0? 7 : yBorder
            defState = defState.map(array => array.map((el, index) => {
                return index < yBorder ? 0 : el
            }))
        }

        dates.forEach(x => {
            let splitDate = x.split(' ')
            let y = splitDate[1]
            let xDate = splitDate[0]
            let date = new Date(xDate)
            if (date >= monday && date <= sunday) {
                let yIndex = date.getDay() == 0? 7 : date.getDay()
                defState[y][yIndex - 1] = 2
            }
        })
        setCalendarState(defState)
    }, [numWeek, dates])


    return (
        <div>
            <div
                className={s.date}>
                <img onClick={() => prevWeek(numWeek)} className={s.prev_arrow_date} src={arrow}
                     alt=""/>{months[monday.getMonth()]}, {monday.getDate()} - {months[sunday.getMonth()]}, {sunday.getDate()}
                <img onClick={() => nextWeek(numWeek)} className={s.next_arrow_date} src={arrow} alt=""/></div>
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
                                    (<div className={s.content_blocks} key={i}>
                                        {
                                            week.map((day, j) => <div key={j}
                                                                      className={`${s.content_block} ${day === 1 ? s.free_content_block : ''} ${day === 2 ? s.new_content_block : ''}`}
                                                                      onClick={() => {
                                                                          if (calendarState[i][j] !== 0) {
                                                                              let delta = new Date(monday)
                                                                              delta.setDate(delta.getDate() + j)
                                                                              let thisDate = `${delta.getFullYear()}/${delta.getMonth() + 1}/${delta.getDate()} ${i}`
                                                                              if (dates.includes(thisDate)) {
                                                                                  setDates(dates.filter(x => x !== thisDate))
                                                                              } else if (dates.length < activeCount) {
                                                                                  let datesDelta = [...dates]
                                                                                  datesDelta.push(thisDate)
                                                                                  setDates(datesDelta)
                                                                              }

                                                                          }
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
        </div>
    );
};

export default FreeCalendarPicker;