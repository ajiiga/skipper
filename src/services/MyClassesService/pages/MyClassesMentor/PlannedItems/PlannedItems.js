import React, {useEffect} from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import PlannedItem from "./PlannedItem";
import myClassesStore from "../../../../../store/myClassesStore";

const PlannedItems = () => {

    useEffect(() => {
        myClassesStore.getBookingList('planned').then(x => console.log(x))
    }, [])

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