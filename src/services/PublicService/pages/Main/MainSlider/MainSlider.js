import React, {useRef, useState} from 'react';
import s from './MainSlider.module.css'
import arrow from '../../../../../static/img/Main/pointer.png'
import publicStore from "../../../../../store/publicStore";
import { useHistory } from "react-router-dom"

const MainSlider = ({items}) => {
    console.log('items', items)
    let changeWidth = 305
    let [currentTranslate, setCurrentTranslate] = useState(0)
    let track = useRef()

    let history = useHistory()

    let handleNext = () => {
        if (-currentTranslate === changeWidth * (items.length - 3)) {
            track.current.style = `transform: translateX(${0}px)`
            setCurrentTranslate(0)
        }
        else {
            let newX = currentTranslate - changeWidth
            setCurrentTranslate(newX)
            track.current.style = `transform: translateX(${newX}px)`
        }
    }

    let handlePrev = () => {
        let newX = currentTranslate + changeWidth
        setCurrentTranslate(newX)
        track.current.style = `transform: translateX(${newX}px)`
    }
    return (
        <div className={s.container}>
            {(items.length < 3 || currentTranslate !== 0) && <img src={arrow} className={s.prev} onClick={handlePrev}/>}
            <div className={s.track_container}>
                <div className={s.track} ref={track}>
                    {items.map((text, index) => <div key={index} className={s.item} onClick={() => {
                        publicStore.setActiveTheme(text.id)
                        history.push('/catalog')
                    }}>{text.name}</div>)}
                </div>
            </div>
            {true &&  (<img src={arrow} className={s.next} onClick={handleNext}/>)}
        </div>
    );
};

export default MainSlider;