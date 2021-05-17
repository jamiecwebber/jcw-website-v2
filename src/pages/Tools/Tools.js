import React from 'react';
import { homeObjOne, homeObjTwo, } from './Data';
import { BackgroundSection } from '../../components';
import { Container } from '../../globalStyles';


const Tools = () => {
    return (
        <Container >
            <h1> TOOLS </h1>      
           <BackgroundSection {...homeObjTwo}/>
           <BackgroundSection {...homeObjOne}/>
        </Container>
    )
}

export default Tools
