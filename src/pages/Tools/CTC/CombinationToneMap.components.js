import { StyledCTGrid, GridColumn, GridNote, GridNoteText } from './CombinationToneMap.elements'

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


export const CTGrid = ( { leftMIDI, rightMIDI, gridSize } ) => {

    var loopArray = [...Array(gridSize).keys()];

    return (
        <StyledCTGrid>
            {
                loopArray.map((i)=>{
                    return (
                        <GridColumn>
                            {
                            loopArray.map((j)=>{
                                return (
                                    <GridNote leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize}>
                                        <GridNoteText>
                                            { Math.round(i * midiToFrequency(leftMIDI) + j * midiToFrequency(rightMIDI))}
                                        </GridNoteText>
                                    </GridNote>
                                    )
                                })
                            }
                        </GridColumn>
                    )
                })
            }
        </StyledCTGrid>
    )
}
