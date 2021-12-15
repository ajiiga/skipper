import React, {useEffect, useState} from 'react';
import s from './EditNavBar.module.css'
import search_icon from "../../../../../static/img/Main/search_icon.png";
import EditNavItem from "./EditNavItem/EditNavItem";

const EditNavBar = ({classes, setActiveItem, activeItem}) => {
    let [showList, setShowList] = useState([])

    useEffect(() => {
        let newList = []
        for (let classItem of classes) {
            if (classItem.KeyClass.ClassParentId !== 0) {
                newList.push(<EditNavItem name={classItem.ClassName} type={'Решение под ключ'}
                                          setActiveItem={setActiveItem} id={classItem.ID}
                                          active={classItem.ID === activeItem}/>)
            }

            if (classItem.PracticClass.ClassParentId !== 0) {
                newList.push(<EditNavItem name={classItem.ClassName} type={'Практическое занятие'}
                                          setActiveItem={setActiveItem} id={classItem.ID}
                                          active={classItem.ID === activeItem}/>)
            }

            if (classItem.TheoreticClass.ClassParentId !== 0) {
                newList.push(<EditNavItem name={classItem.ClassName} type={'Теоретическое занятие'}
                                          setActiveItem={setActiveItem} id={classItem.ID}
                                          active={classItem.ID === activeItem}/>)
            }

        }
        setShowList(newList)
    }, [classes, activeItem])
    return (
        <div className={s.container}>
            <div className={s.input_container}>
                <input className={s.input} placeholder={'Поиск'} type="text"/>
                <img className={s.search_icon} src={search_icon} alt=""/>
            </div>
            <div className={s.content_container}>
                <button className={s.add_btn} onClick={() => setActiveItem(0)}>+ создать новое занятие</button>
                <div className={s.items}>
                    {
                        showList
                    }
                </div>
            </div>
        </div>
    );
};

export default EditNavBar;