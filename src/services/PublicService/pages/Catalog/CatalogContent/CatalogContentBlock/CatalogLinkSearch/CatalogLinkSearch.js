import React from 'react';
import {Link} from "react-router-dom";
import s from './CatalogLinkSearch.module.css'
import arrow from '../../../../../../../static/img/Catalog/theme_arrow.svg'

const CatalogLinkSearch = ({name, count}) => {
    return (
        <Link to={`search/${name}`}>
            <div className={s.container}>
                <div className={s.name}>{name}</div>
                <div className={s.count}>{count}</div>
                <div className={s.arrow}><img src={arrow} alt=""/></div>
            </div>
        </Link>
    );
};

export default CatalogLinkSearch;