import React from 'react';
import s from '../EditNavBar.module.css'
import img from '../../../../../../static/img/EditClasses/arrow.svg'

const EditNavItem = () => {
    return (
        <div className={s.item_container}>
            <div className={s.item_block}>
                <div className={s.text}>
                    <div className={s.title}>Консультация React</div>
                    <div className={s.type}>Решение вопросов в устной форме</div>
                </div>
                <img src={img} alt=""/>
            </div>
        </div>
    );
};

export default EditNavItem;