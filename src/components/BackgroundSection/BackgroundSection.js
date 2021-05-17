import React from 'react';
import {
    ColourBlock,
    BackgroundBlock
} from './BackgroundSection.elements'
import { 
    Container
} from '../../globalStyles';

const BackgroundSection = ({
    img,
    background,
    heading,
    comment
}) => {
    return (
        <Container>
            <ColourBlock background={background}>
                <BackgroundBlock img={img}>
                    <h1>{heading}</h1>
                    <h2>{comment}</h2>
                </BackgroundBlock>
            </ColourBlock>    
        </Container>
    )
}

export default BackgroundSection;