import React from 'react';
import s from '../../EditWorkPlace/EditWorkPlace.module.css'
import Button from "../../../../../../components/UI/Button/Button";

const WorkDefaultScreen = ({setActive}) => {
    return (
        <div className={s.create_btn}>
            <Button title={'Создать'} onClick={() => setActive(false)} />
        </div>
    );
};

export default WorkDefaultScreen;