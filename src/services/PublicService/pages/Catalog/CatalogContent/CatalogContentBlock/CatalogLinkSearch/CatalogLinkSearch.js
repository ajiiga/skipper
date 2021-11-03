import React from 'react';
import {Link} from "react-router-dom";
import s from './CatalogLinkSearch.module.css'
import arrow from '../../../../../../../static/img/Catalog/theme_arrow.svg'
import { useHistory } from "react-router-dom"
import publicStore from "../../../../../../../store/publicStore";

const CatalogLinkSearch = ({name, count}) => {
    let history = useHistory()

    let toSearch = () => {
        publicStore.addTag(name)
        history.push('/search')
    }

    return (
            <div className={s.container} onClick={() => toSearch()}>
                <div className={s.name}>{name}</div>
                <div className={s.count}>{count}</div>
                <div className={s.arrow}><img src={arrow} alt=""/></div>
            </div>
    );
};

export default CatalogLinkSearch;