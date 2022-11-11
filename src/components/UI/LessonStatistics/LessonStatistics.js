import React from 'react';
import s from './LessonStatistics.module.css'

const LessonStatistics = ({statistic}) => {
    return (
        <table className={s.info_table}>
            <tr><td className={s.td_head} /><td className={s.td_head}>Прошлый месяц</td><td className={s.td_head}>Последние 3 месяца</td><td className={s.td_head}>Все время</td></tr>
            <tr><td>Завершенные занятия</td><td>{statistic.last_month_lessons_count - statistic.last_month_unclompleted_lessons}</td><td>{statistic.last_three_months_lessons_count - statistic.last_three_month_unclompleted_lessons}</td><td>{statistic.lessons_count - statistic.uncomplited_lessons}</td></tr>
            <tr><td>Посещаемость</td><td>{statistic.last_month_attendance}%</td><td>{statistic.last_three_month_attendance}%</td><td>{statistic.full_attendance}%</td></tr>
            <tr><td>Отмененные занятия</td><td>{statistic.last_month_unclompleted_lessons}</td><td>{statistic.last_three_month_unclompleted_lessons}</td><td>{statistic.uncomplited_lessons}</td></tr>
        </table>
    );
};

export default LessonStatistics;