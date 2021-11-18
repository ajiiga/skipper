import React, {useState} from 'react';
import s from './CusomMiniSelect.module.css'
import right_arrow from '../../../static/img/Main/pointer.png'

const CustomMiniSelect = ({list, selected, setSelected}) => {

    const [isActive, setIsActive] = useState(false);

    return (
        <div className={s.dropdown}>
            <div className={s.dropdown_btn} onClick={(e) => setIsActive(!isActive)}>
                {selected}
                <img src={right_arrow} className={s.arrow} alt=""/>
            </div>
            {isActive && (
                <div className={s.dropdown_content}>
                    {list.map((option) => (
                        <div
                            key={option}
                            onClick={(e) => {
                                setSelected(option);
                                setIsActive(false);
                            }}
                            className={s.dropdown_item}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CustomMiniSelect;