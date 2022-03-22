import {useEffect, useMemo, useState} from "react";
import myClassesStore from "../store/myClassesStore";

export default function useMyClassesItems(status, mentor) {
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
        if (mentor)
            myClassesStore.getBookingList(status).then(x => {
                setItems(x)
                setIsFetching(false)
                console.log(x)
            })
        else
            myClassesStore.getMyBookingList(status).then(x => {
                setItems(x)
                setIsFetching(false)
                console.log(x)
            })
    }, [])

    return [isFetching, activeSort, setActiveSort, sortedItems, setItems]
}