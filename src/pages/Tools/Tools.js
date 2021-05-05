import React from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../../components';


const Tools = () => {
    return (
        <>
            <h1> TOOOOLS </h1>
           <InfoSection {...homeObjOne}/>
           <InfoSection {...homeObjTwo}/> 
           <InfoSection {...homeObjThree}/> 
           <InfoSection {...homeObjFour}/> 
        </>
    )
}

export default Tools
