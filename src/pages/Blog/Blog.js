import React from 'react';
import { homeObjTwo, homeObjThree } from './Data';
import { InfoSection, BackgroundSection } from '../../components';
import { Container } from '../../globalStyles'  // important for resizing w mobile


const Blog = () => {
    return (
        <Container>
           <h1> Blog </h1>
           <BackgroundSection {...homeObjTwo}/> 
           <BackgroundSection {...homeObjThree}/> 
        </Container>
    )
}

export default Blog
