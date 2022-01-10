import React from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import CompletedItem from "./CompletedItem";

const CompletedItems = () => {
    return (
        <div>
            <MyClassesSample>
                <CompletedItem/>
                <CompletedItem/>
                <CompletedItem/>
            </MyClassesSample>
        </div>
    );
};

export default CompletedItems;