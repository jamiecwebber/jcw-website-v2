import React from 'react';
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../../components';


const Works = () => {
    return (
        <>
            <h3>Work it</h3>
           <InfoSection {...homeObjOne}/>
           <InfoSection {...homeObjTwo}/> 
           <InfoSection {...homeObjThree}/> 
           <InfoSection {...homeObjFour}/> 
        </>
    )
}

export default Works
