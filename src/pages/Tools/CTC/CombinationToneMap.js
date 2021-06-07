import { useState, useEffect, useRef } from 'react'
import { CTContainer } from './CombinationToneMap.styles'
import { CTGrid, CTControls } from './CombinationToneMap.components'


// const Note = ({frequency}) => {
//     if (frequency === 0) { return <GridNote></GridNote> }; // returns empty square for freq of 0

//     let midicents = frequencyToMidicents(frequency);
    
//     let cents = Math.round(midicents % 100);
//     if (cents >= 50) cents -= 100;
    
//     let semitone = Math.round(midicents / 100);
//     let octave = Math.floor(semitone/12) - 1;
//     let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
//     let note = notes[semitone % 12];

//     return (
//       <GridNote>
//           <GridLine>{Math.floor(frequency)}</GridLine>
//           <GridLineBig>{note} {octave} {cents >= 0 ? ' +' : ' -'}{Math.abs(cents)}</GridLineBig>
//           <GridLine>{Math.floor(cents * 81.92 + 8192)}</GridLine>
//       </GridNote>

//     )
//  }
 
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