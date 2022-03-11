import React, {useEffect, useState} from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import ConsiderationItem from "./ConsiderationItem";
import myClassesStore from "../../../../../store/myClassesStore";

const ConsiderationItems = () => {
    let [items, setItems] = useState([])

    useEffect(() => {
        myClassesStore.getBookingList('consideration').then(x => setItems(x))
    }, [])



    return (
        <div>
            <MyClassesSample>
                {items.map(x => <ConsiderationItem key={x.ID} data={x} />)}
            </MyClassesSample>
        </div>
    );
};

export default ConsiderationItems;