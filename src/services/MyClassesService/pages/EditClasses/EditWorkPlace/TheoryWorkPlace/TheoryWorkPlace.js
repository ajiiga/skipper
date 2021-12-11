import React from 'react';
import LessonWorkPlace from "../LessonWorkPlace/LessonWorkPlace";

const TheoryWorkPlace = ({state, setState}) => {
    return (
        <div>
            <LessonWorkPlace state={state} setState={setState}/>
        </div>
    );
};

export default TheoryWorkPlace;