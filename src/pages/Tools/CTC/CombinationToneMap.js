import { useState, useEffect, useRef, useContext } from 'react'
import { CTContainer, StyledControlsContainer } from './CombinationToneMap.styles'
import { CTGrid, CTControls, CTSynthControls } from './CombinationToneMap.components'

import { CTX } from './CombinationToneMap.context'

const CTMap = (
) => {
    const [appState, updateState] = useContext(CTX);

    const [sustainGrid, setSustainGrid] = useState([...Array(16)].map(x=>Array(16).fill(false))); 

    // let handleGridClick = ({i,j}) => {
    //     console.log(i);
    //     console.log(j);

    //     // // play note

    //     // if sustain is on, add to sustain grid
    //     // if (sustainGrid[i][j] || sustainOnClick) {
    //     //     let newGrid = sustainGrid;
    //     //     newGrid[i][j] = !newGrid[i][j]
    //     //     setSustainGrid(newGrid);
    //     // }
    // };

    return (
            <CTContainer>
                <StyledControlsContainer>
                    <CTControls />
                    <CTSynthControls />
                </StyledControlsContainer>
                <CTGrid />
            </CTContainer>
    )
}

export default CTMap