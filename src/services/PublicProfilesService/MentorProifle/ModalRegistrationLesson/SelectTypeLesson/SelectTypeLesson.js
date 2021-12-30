import React from 'react';
import s from '../ModalRegistrationLesson.module.css'

const SelectTypeLesson = ({theory, practice, turnkey, selectedType, setSelectedType}) => {
    return (
        <div>
            {theory && <div className={`${s.type_item} ${selectedType === 0? s.active_item : ''}`} onClick={() => setSelectedType(0)}>
                <div>Теоретическая консультация</div>
                <div className={s.type_description}>Решение профильных вопросов в устной форме</div>
            </div>}
            {practice && <div className={`${s.type_item} ${selectedType === 1? s.active_item : ''}`} onClick={() => setSelectedType(1)}>
                <div>Практическое решение текущих проблем</div>
                <div className={s.type_description}>Разбор практического решения задач</div>
            </div>}
            {turnkey && <div className={`${s.type_item} ${selectedType === 2? s.active_item : ''}`} onClick={() => setSelectedType(2)}>
                <div>Решение "под ключ"</div>
                <div className={s.type_description}>Описание задачи с последующим онлайн-решением</div>
            </div>}
        </div>
    );
};

export default SelectTypeLesson;