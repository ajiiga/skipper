import React from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import CompletedItem from "./CompletedItem";
import useMyClassesItems from "../../../../../CustomHooks/useMyClassesItems";
import myClassesStore from "../../../../../store/myClassesStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const CompletedItems = () => {

    let [isFetching, activeSort, setActiveSort, sortedItems, setItems] = useMyClassesItems('completed', true)

    if (isFetching) {
        return (<Preloader />)
    }

    return (
        <div>
            <MyClassesSample activeSort={activeSort} setActiveSort={setActiveSort}>
                {sortedItems.map(x => <CompletedItem key={x.ID} data={x}/>)}
            </MyClassesSample>
        </div>
    );
};

export default CompletedItems;