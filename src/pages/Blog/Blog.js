import React from 'react';
import { homeObjThree, homeObjFour } from './Data';
import { InfoSection } from '../../components';


const Blog = () => {
    return (
        <>
           <h1> Blog </h1>
           <InfoSection {...homeObjThree}/> 
           <InfoSection {...homeObjFour}/> 
        </>
    )
}

export default Blog
