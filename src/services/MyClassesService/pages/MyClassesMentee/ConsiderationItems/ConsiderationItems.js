import React from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import ConsiderationItem from "./ConsiderationItem";
import useMyClassesItems from "../../../../../CustomHooks/useMyClassesItems";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const ConsiderationItems = () => {

    let [isFetching, activeSort, setActiveSort, sortedItems, setItems] = useMyClassesItems('consideration', false)

    if (isFetching) {
        return (<Preloader />)
    }

    return (
        <div>
            <MyClassesSample setActiveSort={setActiveSort} activeSort={activeSort}>
                {sortedItems.map(x => <ConsiderationItem key={x.ID} data={x} deleteItem={() => setItems((items) => items.filter(i => x.ID !== i.ID))} />)}
            </MyClassesSample>
        </div>
    );
};

export default ConsiderationItems;