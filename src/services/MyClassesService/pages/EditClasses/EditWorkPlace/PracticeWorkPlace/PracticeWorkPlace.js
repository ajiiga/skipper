import React from 'react';
import LessonWorkPlace from "../LessonWorkPlace/LessonWorkPlace";

const PracticeWorkPlace = ({state, setState}) => {
    return (
        <div>
            <LessonWorkPlace setState={setState} state={state}/>
        </div>
    );
};

export default PracticeWorkPlace;