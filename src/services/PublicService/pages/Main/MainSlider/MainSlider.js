import React, {useRef, useState} from 'react';
import s from './MainSlider.module.css'
import arrow from '../../../../../static/img/Main/pointer.png'

const MainSlider = ({items}) => {
    let changeWidth = 305
    let [currentTranslate, setCurrentTranslate] = useState(0)
    let track = useRef()

    let handleNext = () => {
        let newX = currentTranslate - changeWidth
        setCurrentTranslate(newX)
        track.current.style = `transform: translateX(${newX}px)`
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
                    {items.map((text, index) => <div key={index} className={s.item}>{text}</div>)}
                </div>
            </div>
            {((items.length < 3) || (-currentTranslate !== changeWidth * (items.length - 3))) &&  (<img src={arrow} className={s.next} onClick={handleNext}/>)}
        </div>
    );
};

export default MainSlider;