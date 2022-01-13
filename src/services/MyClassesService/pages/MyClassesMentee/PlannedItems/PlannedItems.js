import React from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import PlannedItem from "./PlannedItem";

const PlannedItems = () => {
    return (
        <div>
            <MyClassesSample>
                <PlannedItem />
                <PlannedItem />
                <PlannedItem />
            </MyClassesSample>
        </div>
    );
};

export default PlannedItems;