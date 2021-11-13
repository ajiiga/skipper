import React, {useEffect, useMemo, useState} from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from './Catalog.module.css'
import Button from "../../../../components/UI/Button/Button";
import SideBar from "./SideBar/SideBar";
import CatalogContent from "./CatalogContent/CatalogContent";
import {getCategoriesRequest} from "../../../../api/api_public";
import publicStore from "../../../../store/publicStore";
import Preloader from "../../../../components/UI/Preloader/Preloader";

const Catalog = () => {

    let [activeTheme, setActiveTheme] = useState(1)
    let [isFetching, setIsFetching] = useState(true)
    let [items, setItems] = useState('')

    useEffect(() => {
        publicStore.getCategories().then((data) => {
            let a = []
            a.push(data)
            setItems(a)
            setIsFetching(false)
            }
        )
    }, [])




    let activeThemes = useMemo(() => {
        if (Array.isArray(items)) {
            let jsonItems = JSON.parse(items)
            for (let block of jsonItems) {
                let delta = block['Child0'].filter(x => x.ID === activeTheme)
                if (delta.length !== 0) {
                    return delta[0]['Child1']
                }
            }
        }
        return []
    }, [activeTheme, items])

    if (isFetching) {
        return <Preloader />
    }

    return (
        <div className={s.container}>
            <div className={s.content_container}>
                <div className={s.fixed_sidebar}>
                    <MiniNavBar child={'Каталог'}/>
                    <SideBar items={items} activeTheme={activeTheme} setActiveTheme={setActiveTheme}/>
                </div>
                <div className={s.fake_sidebar}/>
                <CatalogContent activeThemes={activeThemes}/>
            </div>
        </div>
    );
};

export default Catalog;