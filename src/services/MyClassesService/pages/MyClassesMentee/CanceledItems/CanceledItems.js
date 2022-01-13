import React from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import CanceledItem from "./CanceledItem";

const CanceledItems = () => {
    return (
        <div>
            <MyClassesSample>
                <CanceledItem/>
                <CanceledItem/>
                <CanceledItem/>
            </MyClassesSample>
        </div>
    );
};

export default CanceledItems;