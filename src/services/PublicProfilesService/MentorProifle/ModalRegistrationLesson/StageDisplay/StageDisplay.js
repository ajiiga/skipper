import React, {useEffect, useRef} from 'react';
import s from './StageDisplay.module.css'

const StageDisplay = ({num}) => {

    let target = useRef()

    useEffect(() => {
        target.current.style = `margin-left: ${(num - 1) * 64}px`
    }, [num])

    return (
        <div className={s.container}>
            <div className={s.yellow_circle} ref={target}/>
            <div className={s.empty_circle}/>
            <div className={s.empty_circle}/>
            <div className={s.empty_circle}/>
            <div className={s.empty_circle}/>
        </div>
    );
};

export default StageDisplay;