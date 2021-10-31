import React, {useMemo, useState} from 'react';
import MiniNavBar from "../../../../components/UI/MiniNavBar/MiniNavBar";
import s from './Catalog.module.css'
import Button from "../../../../components/UI/Button/Button";
import SideBar from "./SideBar/SideBar";
import CatalogContent from "./CatalogContent/CatalogContent";

const Catalog = () => {

    let [activeTheme, setActiveTheme] = useState(1)


    let items = [
        {
            title: 'IT и технологии', list: [
                {
                    index: 1, logo: 1, name: 'Программирование', items: [{
                        title: 'Продуктовая аналитика',
                        list: [
                            {name: 'Программирование', count: 1506},
                            {name: 'Тестирование', count: 1566},
                            {name: 'DevOps', count: 1232},
                            {name: 'Аналитика', count: 1506}
                        ]
                    }, {
                        title: 'Системный анализ',
                        list: [
                            {name: 'Программирование', count: 1506},
                            {name: 'Тестирование', count: 1566},
                            {name: 'DevOps', count: 1232}
                        ]
                    }, {
                        title: 'Бизнес аналитика',
                        list: [
                            {name: 'Программирование', count: 1506},
                            {name: 'Тестирование', count: 1566},
                            {name: 'DevOps', count: 1232},
                            {name: 'Аналитика', count: 1506},
                            {name: 'DevOps', count: 1232},
                            {name: 'Программирование', count: 1506},
                            {name: 'Тестирование', count: 1566}
                        ]
                    },
                        {
                            title: 'Дебил аналитика',
                            list: [
                                {name: 'Программирование', count: 1506},
                                {name: 'Тестирование', count: 1566},
                                {name: 'DevOps', count: 1232},
                                {name: 'Аналитика', count: 1506},
                                {name: 'DevOps', count: 1232},
                            ]
                        }]
                },
                {index: 2, logo: 2, name: 'Тестирование', items: [{
                        title: 'Продуктовая аналитика',
                        list: [
                            {name: 'Программирование', count: 1506},
                            {name: 'Тестирование', count: 1566},
                            {name: 'DevOps', count: 1232},
                            {name: 'Аналитика', count: 1506}
                        ]
                    }, {
                        title: 'Системный анализ',
                        list: [
                            {name: 'Программирование', count: 1506},
                            {name: 'Тестирование', count: 1566},
                            {name: 'DevOps', count: 1232}
                        ]
                    }]},
                {index: 3, logo: 3, name: 'DevOps'},
                {index: 4, logo: 4, name: 'Аналитика'},
                {index: 5, logo: 5, name: 'Администрирование'}
            ]
        }
    ]


    let activeThemes = useMemo(() => {
        for (let block of items) {
            let delta = block.list.filter(x => x.index === activeTheme)
            if (delta.length !== 0) {
                return delta[0].items
            }
        }
    }, [activeTheme])

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