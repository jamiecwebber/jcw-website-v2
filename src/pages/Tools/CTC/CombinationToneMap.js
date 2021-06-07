import { useState, useEffect, useRef } from 'react'
import { CTContainer } from './CombinationToneMap.styles'
import { CTGrid, CTControls } from './CombinationToneMap.components'
 
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
            <CTControls 
                leftMIDI={leftMIDI} handleLeftChange={handleLeftChange}
                rightMIDI={rightMIDI} handleRightChange={handleRightChange}
                gridSize={gridSize} handleGridChange={handleGridChange}></CTControls>
            <CTGrid leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize}></CTGrid>
        </CTContainer>
    )
}

export default CTMap