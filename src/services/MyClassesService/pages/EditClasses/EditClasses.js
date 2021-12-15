import React, {useEffect, useState} from 'react';
import s from '../../styles/EditClasses.module.css'
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import search_icon from '../../../../static/img/Main/search_icon.png'
import EditNavBar from "./EditNavBar/EditNavBar";
import EditWorkPlace from "./EditWorkPlace/EditWorkPlace";
import myClassesStore from "../../../../store/myClassesStore";
import Preloader from "../../../../components/UI/Preloader/Preloader";


const EditClasses = () => {
    let [fetching, setFetching] = useState(true)
    let [classes, setClasses] = useState([])
    let [tags, setTags] = useState([])
    let [activeItem, setActiveItem] = useState(0)
    useEffect(() => {
        myClassesStore.initializeEditClasses().then(x => {
            setClasses(x.myClasses)
            setTags(x.childTags)
        }).then(x => setFetching(false))

    }, [])

    if (fetching) {
        return <Preloader />
    }
    return (
        <div className={s.container}>
            <MiniNavBar child={'Мои занятия'} secondChild={'Редактирование занятий'} secondUrl={'/my-classes-mentor'}/>
            <div className={s.content_container}>
                <div className={s.left_side}>
                    <EditNavBar classes={classes} setActiveItem={setActiveItem} activeItem={activeItem}/>
                </div>
                <div className={s.right_side}>
                    <EditWorkPlace list={tags} setClasses={setClasses} classes={classes} activeItem={activeItem}/>
                </div>
            </div>

        </div>
    );
};

export default EditClasses;