import React, {useEffect, useMemo, useState} from 'react';
import s from './EditNavBar.module.css'
import search_icon from "../../../../../static/img/Main/search_icon.png";
import EditNavItem from "./EditNavItem/EditNavItem";
import SearchBar from "../../../../../components/UI/SearchBar/SearchBar";

const EditNavBar = ({classes, setActiveItem, activeItem}) => {
    let [showList, setShowList] = useState([])
    let [query, setQuery] = useState('')

    useEffect(() => {
        let newList = []
        for (let classItem of classes.filter(x => x.ClassName.toLowerCase().includes(query.toLowerCase()))) {
                newList.push(<EditNavItem key={classItem.ID} name={classItem.ClassName} type={classItem.Description}
                                          setActiveItem={setActiveItem} id={classItem.ID}
                                          active={classItem.ID === activeItem}/>)
        }
        setShowList(newList)
    }, [classes, activeItem, query])



    return (
        <div className={s.container}>
            <SearchBar query={query} setQuery={setQuery} />
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