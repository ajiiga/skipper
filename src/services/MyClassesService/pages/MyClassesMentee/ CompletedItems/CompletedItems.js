import React from 'react';
import MyClassesSample from "../../../MyClassesSample/MyClassesSample";
import CompletedItem from "./CompletedItem";
import useMyClassesItems from "../../../../../CustomHooks/useMyClassesItems";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const CompletedItems = () => {

    let [isFetching, activeSort, setActiveSort, sortedItems, setItems] = useMyClassesItems('completed', false)

    if (isFetching) {
        return (<Preloader />)
    }

    return (
        <div>
            <MyClassesSample activeSort={activeSort} setActiveSort={setActiveSort}>
                {sortedItems.map(x => <CompletedItem key={x.ID} data={x} deleteItem={() => setItems((items) => items.filter(i => x.ID !== i.ID))} />)}
            </MyClassesSample>
        </div>
    );
};

export default CompletedItems;