import { StyledCTGrid, GridColumn, GridNote, GridNoteText, StyledCTControls, Label, NoteSlider, GridSizeSlider } from './CombinationToneMap.elements'
import { useEffect, useRef } from 'react';

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

export const CTControls = ( { leftMIDI, rightMIDI, gridSize, handleLeftChange, handleRightChange, handleGridChange } ) => {

    return (
        <StyledCTControls>
            <h1>Combination Tone Grid</h1>
                <Label><div>Left: {leftMIDI} {midiToNote(leftMIDI)} {midiToFrequency(leftMIDI).toFixed(2)} Hz</div> <NoteSlider type="range" min="1" max="108" value={leftMIDI} class="slider" onChange={handleLeftChange} id="leftSlider"/></Label>
                <Label><div>Right: {rightMIDI} {midiToNote(rightMIDI)} {midiToFrequency(leftMIDI).toFixed(2)} Hz</div><NoteSlider type="range" min="1" max="108" value={rightMIDI} class="slider" onChange={handleRightChange} id="rightSlider"/></Label>
                <Label>Grid Size: {gridSize} <GridSizeSlider type="range" min="1" max="16" value={gridSize} class="slider" onChange={handleGridChange} id="gridSizeSlider" /> </Label>
        </StyledCTControls>
    )


}

export const CTGrid = ( { leftMIDI, rightMIDI, gridSize } ) => {

    const loopArray = useRef([...Array(gridSize).keys()])

    useEffect(() => {
        console.log(gridSize);
        loopArray.current = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
        loopArray.current = loopArray.current.slice(0,gridSize);
        console.log(loopArray.current);
    }, [gridSize])

    return (
        <StyledCTGrid >
            {
                loopArray.current.map((i)=>{
                    return (
                        <GridColumn>
                            {
                            loopArray.current.map((j)=>{
                                return (
                                    <GridNote leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize}>
                                        <GridNoteText>
                                            { (i * midiToFrequency(leftMIDI) + j * midiToFrequency(rightMIDI)).toFixed(2)} Hz
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
