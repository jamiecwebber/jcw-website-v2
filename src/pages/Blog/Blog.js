import React from 'react';
import { homeObjTwo, homeObjThree } from './Data';
import { InfoSection, BackgroundSection } from '../../components';


const Blog = () => {
    return (
        <>
           <h1> Blog </h1>
           <BackgroundSection {...homeObjTwo}/> 
           <BackgroundSection {...homeObjThree}/> 
        </>
    )
}

export default Blog
