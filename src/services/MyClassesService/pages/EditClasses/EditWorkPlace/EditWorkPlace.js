import React from 'react';
import s from './EditWorkPlace.module.css'
import Tag from "../../../../../components/UI/Tag/Tag";
import Button from "../../../../../components/UI/Button/Button";

const EditWorkPlace = () => {
    return (
        <div className={s.container}>
            <div className={s.display_container}>
                <div className={`${s.display_block} ${s.title_block}`}>
                    <div className={s.display_title}>Название</div>
                    <input type="text" className={s.input} placeholder={'Название'}/>
                </div>
                <div className={`${s.display_block} ${s.description_block}`}>
                    <div className={s.display_title}>Описание</div>
                    <input type="text" className={s.input} placeholder={'Краткое описание вашего курса'}/>
                </div>
                <div className={`${s.display_block} ${s.tag_block}`}>
                    <div className={s.display_title}>Название</div>
                    <div className={s.textarea_container}>
                        <div className={s.tags}></div>
                        <textarea className={s.textarea} placeholder={'Выберите то, чему будете учить'}>

                        </textarea>
                        <div className={s.count_tag}>0 / 3</div>
                    </div>
                </div>
            </div>


            <div className={s.btns}>
                <div className={`${s.mode_btn} ${s.active_mode_btn}`}>
                    Теоретическая консультация
                </div>
                <div className={s.mode_btn}>
                    Практическое решение текущих проблем
                </div>
                <div className={s.mode_btn}>
                    Решение ‘под ключ’
                </div>
            </div>

            <div className={s.work_container}>

            </div>
            <div className={s.save_btn_container}>
                <div className={s.save_btn}>
                    <Button title={'Сохранить'}/>
                </div>
            </div>
        </div>
    );
};

export default EditWorkPlace;