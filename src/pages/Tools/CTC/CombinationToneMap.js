import { useState, useEffect, useRef } from 'react'
import { CTContainer, StyledControlsContainer } from './CombinationToneMap.styles'
import { CTGrid, CTControls} from './CombinationToneMap.components'
import { CTSynth } from './CombinationToneMap.synth'
 
const CTMap = (
) => {
  
    const [leftMIDI, setLeftMIDI] = useState(40);
    const [rightMIDI, setRightMIDI] = useState(47);
    const [gridSize, setGridSize] = useState(8);

    
    const handleLeftChange = (event) => {
        setLeftMIDI(event.target.value);
    }
    
    const handleRightChange = (event) => {
        setRightMIDI(event.target.value);
    }
    
    const handleGridChange = (event) => {
        setGridSize(event.target.value);
    }

    return (
        <CTContainer>
            <StyledControlsContainer>
                <CTControls 
                    leftMIDI={leftMIDI} handleLeftChange={handleLeftChange}
                    rightMIDI={rightMIDI} handleRightChange={handleRightChange}
                    gridSize={gridSize} handleGridChange={handleGridChange} />
                   
                <CTSynth leftMIDI={leftMIDI} rightMIDI={rightMIDI} />
            </StyledControlsContainer>
            <CTGrid leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize}></CTGrid>
        </CTContainer>
    )
}

export default CTMap