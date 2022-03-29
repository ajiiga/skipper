import React from 'react';
import MyClassesSample from "../../../MyClassesSample/MyClassesSample";
import CanceledItem from "./CanceledItem";
import useMyClassesItems from "../../../../../CustomHooks/useMyClassesItems";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const CanceledItems = () => {

    let [isFetching, activeSort, setActiveSort, sortedItems, setItems] = useMyClassesItems('canceled', false)

    if (isFetching) {
        return (<Preloader />)
    }

    return (
        <div>
            <MyClassesSample activeSort={activeSort} setActiveSort={setActiveSort}>
                {sortedItems.map(x => <CanceledItem key={x.ID} data={x} deleteItem={() => setItems((items) => items.filter(i => x.ID !== i.ID))} />)}
            </MyClassesSample>
        </div>
    );
};

export default CanceledItems;