import React from 'react';
import s from './FreeTimeCalendar.module.css'
import arrow from '../../../../static/img/FreeTimeCalendar/arrow.svg'

const FreeTimeCalendar = ({classes}) => {

    let allTimes = []
    classes.forEach(x => {
        allTimes.push(x.KeyClass.Time)
        allTimes.push(x.PracticClass.Time)
        allTimes.push(x.TheoreticClass.Time)
    })

    let result = "00000000000000000000000000000000000000000000000000000000".split('')
    allTimes.filter(x => x !== '').forEach((x, index) => {
        x.split('').forEach((y, index) => {
            if (y == 1) {
                result[index] = '1'
            }
        })
    })
    result = result.join('')

    let decode = (calendar_code) => {
        let res = []
        for (let i = 0; i < 8; i++) {
            res.push(calendar_code.slice(i * 7, (i + 1) * 7))
        }
        return res.map(x => x.split('').map(x => parseInt(x)))
    }



    return (
        <div className={s.container}>
            {/*<div className={s.change_week_display}>*/}
            {/*    <img src={arrow} className={s.prev_arrow} alt=""/>*/}
            {/*    <div className={s.change_week_text}>май, 18 - май, 24</div>*/}
            {/*    <img src={arrow} className={s.next_arrow} alt=""/>*/}
            {/*</div>*/}
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
                            {decode(result).map(x => <div className={s.content_blocks}>
                                {x.map(y => <div className={`${s.content_block} ${y == 1 ? s.free_content_block : ''}`}/>)}
                            </div>)}

                        </div>
                        <div className={s.example_display}>
                            <span className={s.free_example}/> - есть возможность записи <span
                            className={s.busy_example}/> - запись ограничена
                        </div>
                    </div>

                </div>

            </div>
            <button className={s.check_btn}>
                Проверить
            </button>
        </div>
    );
};

export default FreeTimeCalendar;