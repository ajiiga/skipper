import React from 'react';
import s from '../../styles/EditClasses.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import search_icon from '../../../../static/img/Main/search_icon.png'
import EditNavBar from "./EditNavBar/EditNavBar";
import EditWorkPlace from "./EditWorkPlace/EditWorkPlace";


const EditClasses = () => {
    return (
        <div className={s.container}>
            <MiniNavBar child={'Мои занятия'} secondChild={'Редактирование занятий'} secondUrl={'/my-classes-mentor'}/>
            <div className={s.content_container}>
                <div className={s.left_side}>
                    <EditNavBar />
                </div>
                <div className={s.right_side}>
                    <EditWorkPlace />
                </div>
            </div>

        </div>
    );
};

export default EditClasses;