import { useState, useEvent } from 'react'
import { CTControls , StyledCTGrid, CTContainer, NoteSlider, Label ,} from './CombinationToneMap.elements'
import { CTGrid } from './CombinationToneMap.components'

let midiToFrequency = (midi) => {
  return Math.pow(2,((midi-69)/12)) * 440;
}

let frequencyToMidicents = (frequency) => {
  // this calculation assumes A4 = 440Hz = 6900 MIDIcents
  // https://newt.phys.unsw.edu.au/jw/notes.html
  let midicents = 6900 + 1200 * Math.log(frequency/440) / Math.log(2);
  return midicents;
} 

const midiToNote = (midi) => {
  let octave = Math.floor(midi/12) - 1;
  
  let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  let note = notes[midi % 12];
  return [note, octave];
}



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
  
    const [leftMIDI, setLeftMIDI] = useState(48);
    const [rightMIDI, setRightMIDI] = useState(52);
    const [gridSize, setGridSize] = useState(8);
    
    const handleLeftChange = (event) => {
        setLeftMIDI(event.target.value);
    }
    
    const handleRightChange = (event) => {
        setRightMIDI(event.target.value);
    }
    
    const handleGridSizeChange = (event) => {
        setGridSize(event.target.value);
    }

    return (
        <CTContainer>
            { gridSize }
            <CTControls leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize}></CTControls>
            <CTGrid leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize}></CTGrid>
        </CTContainer>
    )
}

export default CTMap