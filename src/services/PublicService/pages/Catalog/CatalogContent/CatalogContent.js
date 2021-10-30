import React from 'react';
import s from './CatalogContent.module.css'
import CatalogSliderBlock from "./CatalogContentBlock/CatalogSliderBlock";

const CatalogContent = ({activeThemes}) => {
    return (
        <div className={s.container}>
            <CatalogSliderBlock activeThemes={activeThemes} />
        </div>
    );
};

export default CatalogContent;