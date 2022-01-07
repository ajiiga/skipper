import React, {useState} from 'react';
import s from '../ModalRegistrationLesson.module.css'

const SelectCountLesson = ({lesson, timeLessons, setTimeLessons, defaultState, setActiveCount}) => {





    let handleBtn = (min, count) => {
        setActiveCount(count)
        let deltaTimeLessons = {...defaultState}
        deltaTimeLessons[`min${min}`][`count${count}`] = !deltaTimeLessons[`min${min}`][`count${count}`]
        setTimeLessons(deltaTimeLessons)
    }

    return (
        <div className={s.count_lesson_container}>
            {lesson.Duration15 && <div className={s.count_lesson_block}>
                <div className={s.count_lesson_block_title}>15 минут (пробное занятие)</div>
                <div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min15.count1 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(15, 1)}>
                        <div>1 занятие</div>
                        <div>{lesson.Price15} руб</div>
                    </div>
                </div>
            </div>}
            {lesson.Duration30 && <div className={s.count_lesson_block}>
                <div className={s.count_lesson_block_title}>30 минут</div>
                <div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min30.count1 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(30, 1)}>
                        <div>1 занятие</div>
                        <div>{lesson.Price30} руб</div>
                    </div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min30.count3 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(30, 3)}>
                        <div>3 занятие</div>
                        <div>{lesson.Price30 * 3} руб</div>
                    </div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min30.count5 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(30, 5)}>
                        <div>5 занятие</div>
                        <div>{lesson.Price30 * 5} руб</div>
                    </div>
                </div>
            </div>}
            {lesson.Duration60 && <div className={s.count_lesson_block}>
                <div className={s.count_lesson_block_title}>60 минут</div>
                <div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min60.count1 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(60, 1)}>
                        <div>1 занятие</div>
                        <div>{lesson.Price60} руб</div>
                    </div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min60.count3 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(60, 3)}>
                        <div>3 занятие</div>
                        <div>{lesson.Price60 * 3} руб</div>
                    </div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min60.count5 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(60, 5)}>
                        <div>5 занятие</div>
                        <div>{lesson.Price60 * 5} руб</div>
                    </div>
                </div>
            </div>}
            {lesson.Duration90 && <div className={s.count_lesson_block}>
                <div className={s.count_lesson_block_title}>90 минут</div>
                <div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min90.count1 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(90, 1)}>
                        <div>1 занятие</div>
                        <div>{lesson.Price90} руб</div>
                    </div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min90.count3 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(90, 3)}>
                        <div>3 занятие</div>
                        <div>{lesson.Price90 * 3} руб</div>
                    </div>
                    <div
                        className={`${s.count_lesson_block_button} ${timeLessons.min90.count5 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn(90, 5)}>
                        <div>5 занятие</div>
                        <div>{lesson.Price90 * 5} руб</div>
                    </div>
                </div>
            </div>}
            {lesson.FullTime && <div className={s.count_lesson_block}>
                <div className={s.count_lesson_block_title}>Индивидуальный срок</div>
                <div>
                    <div className={`${s.count_lesson_block_button} ${timeLessons.minIndividualTerm.count1 ? s.count_lesson_block_active : ''}`}
                        onClick={() => handleBtn('IndividualTerm', 1)}>
                        <div>1 час</div>
                        <div>{lesson.PriceFullTime} руб</div>
                    </div>
                </div>
            </div>}
        </div>
    );
};

export default SelectCountLesson;