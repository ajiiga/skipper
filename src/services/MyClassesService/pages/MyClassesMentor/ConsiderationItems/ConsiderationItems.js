import React, {useEffect, useMemo, useState} from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import ConsiderationItem from "./ConsiderationItem";
import myClassesStore from "../../../../../store/myClassesStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";
import useMyClassesItems from "../../../../../CustomHooks/useMyClassesItems";

const ConsiderationItems = () => {
    
    let [isFetching, activeSort, setActiveSort, sortedItems, setItems] = useMyClassesItems('consideration', true)

    if (isFetching) {
        return (<Preloader />)
    }


    return (
        <div>
            <MyClassesSample activeSort={activeSort} setActiveSort={setActiveSort}>
                {sortedItems.map(x => <ConsiderationItem key={x.ID} data={x} deleteItem={() => setItems((items) => items.filter(i => x.ID !== i.ID))} />)}
            </MyClassesSample>
        </div>
    );
};

export default ConsiderationItems;