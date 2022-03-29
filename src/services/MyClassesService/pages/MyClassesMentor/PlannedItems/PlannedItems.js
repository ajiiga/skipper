import React, {useEffect} from 'react';
import MyClassesSample from "../../../MyClassesSample/MyClassesSample";
import PlannedItem from "./PlannedItem";
import myClassesStore from "../../../../../store/myClassesStore";
import useMyClassesItems from "../../../../../CustomHooks/useMyClassesItems";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const PlannedItems = () => {

    let [isFetching, activeSort, setActiveSort, sortedItems, setItems] = useMyClassesItems('planned', true)

    if (isFetching) {
        return (<Preloader />)
    }

    return (
        <div>
            <MyClassesSample setActiveSort={setActiveSort} activeSort={activeSort}>
                {sortedItems.map(x => <PlannedItem key={x.ID} data={x} deleteItem={() => setItems((items) => items.filter(i => x.ID !== i.ID))} />)}
            </MyClassesSample>
        </div>
    );
};

export default PlannedItems;