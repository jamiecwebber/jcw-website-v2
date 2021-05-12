import React from 'react';
import { Link } from 'react-router-dom';
import {
    ColourBlock,
    BackgroundBlock
} from './BackgroundSection.elements'
import { 
    Container
} from '../../globalStyles';

const BackgroundSection = ({
    img,
    background
}) => {
    return (
        <Container>
            <ColourBlock background={background}>
                <BackgroundBlock img={img}>

                </BackgroundBlock>
            </ColourBlock>    
        </Container>
    )
}

export default BackgroundSection;