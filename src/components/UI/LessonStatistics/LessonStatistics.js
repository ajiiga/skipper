import React from 'react';
import s from './LessonStatistics.module.css'

const LessonStatistics = () => {
    return (
        <table className={s.info_table}>
            <tr><td className={s.td_head} /><td className={s.td_head}>Прошлый месяц</td><td className={s.td_head}>Последние 3 месяца</td><td className={s.td_head}>Все время</td></tr>
            <tr><td>Завершенные занятия</td><td>17</td><td>48</td><td>152</td></tr>
            <tr><td>Посещаемость</td><td>100%</td><td>98%</td><td>99%</td></tr>
            <tr><td>Отмененные занятия</td><td>0</td><td>1</td><td>1</td></tr>
        </table>
    );
};

export default LessonStatistics;