import React from 'react';
import s from './CatalogSliderBlock.module.css'
import CatalogLinkSearch from "./CatalogLinkSearch/CatalogLinkSearch";
import {Link} from "react-router-dom";
import arrow from '../../../../../../static/img/Catalog/arrow.svg'

const CatalogSliderBlock = ({activeThemes}) => {


    return (
        <div className={s.container}>
            <img src={arrow} alt="" className={s.prev}/>
            <div className={s.items_container}>
                {activeThemes.map(t => <div className={s.block}>
                    <div className={s.title}>{t.title}</div>
                    {t.list.map(x => <CatalogLinkSearch name={x.name} count={x.count}/>)}</div>)}
            </div>
            <img src={arrow} alt="" className={s.next}/>
        </div>
    );
};

export default CatalogSliderBlock;