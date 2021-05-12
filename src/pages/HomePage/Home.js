import React from 'react';
import { homeObjOne, homeObjTwo } from './Data';
import { InfoSection, BackgroundSection } from '../../components';


const Home = () => {
    return (
        <>
            
           <BackgroundSection {...homeObjTwo}/>
           <BackgroundSection {...homeObjOne}/>
        </>
    )
}

export default Home
