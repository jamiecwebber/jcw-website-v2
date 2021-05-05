import React from 'react';
import { homeObjTwo, homeObjThree } from './Data';
import { InfoSection } from '../../components';


const Blog = () => {
    return (
        <>
           <h1> Blog </h1>
           <InfoSection {...homeObjTwo}/> 
           <InfoSection {...homeObjThree}/> 
        </>
    )
}

export default Blog
