import React from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import ConsiderationItem from "./ConsiderationItem";

const ConsiderationItems = () => {
    return (
        <div>
            <MyClassesSample>
                <ConsiderationItem />
                <ConsiderationItem />
                <ConsiderationItem />
            </MyClassesSample>
        </div>
    );
};

export default ConsiderationItems;