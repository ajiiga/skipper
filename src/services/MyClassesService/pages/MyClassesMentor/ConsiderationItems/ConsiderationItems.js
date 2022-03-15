import React, {useEffect, useMemo, useState} from 'react';
import MyClassesSample from "../../MyClassesSample/MyClassesSample";
import ConsiderationItem from "./ConsiderationItem";
import myClassesStore from "../../../../../store/myClassesStore";
import Preloader from "../../../../../components/UI/Preloader/Preloader";

const ConsiderationItems = () => {
    let [items, setItems] = useState([])
    let [isFetching, setIsFetching] = useState(true)
    let keyList = ['signDate', 'dateEvent', 'expensive', 'cheap']
    let [activeSort, setActiveSort] = useState(keyList[0])

    let sortedItems = useMemo(() => {
        switch (activeSort) {
            case 'signDate':
                return items.sort((a, b) => a.ID - b.ID)
            case 'dateEvent':
                return items.sort((a, b) => {
                    let aDate = new Date(a.Time[0].Time.split(' ')[0])
                    let bDate = new Date(b.Time[0].Time.split(' ')[0])
                    return aDate - bDate
                })
            case 'cheap':
                return items.sort((a, b) => a.Price - b.Price)
            case 'expensive':
                return items.sort((a, b) => b.Price - a.Price)
        }
    }, [keyList, items])

    useEffect(() => {
        myClassesStore.getBookingList('consideration').then(x => {
            setItems(x)
            setIsFetching(false)
            console.log(x)
        })
    }, [])

    if (isFetching) {
        return (<Preloader />)
    }

    return (
        <div>
            <MyClassesSample activeSort={activeSort} setActiveSort={setActiveSort}>
                {sortedItems.map(x => <ConsiderationItem key={x.ID} data={x} />)}
            </MyClassesSample>
        </div>
    );
};

export default ConsiderationItems;