import { StyledCTGrid, GridColumn, ZeroGridNote, StyledGridNote, GridNoteMain, GridNoteName, GridNoteCentsAndOctave, StyledCTControls, Label, NoteSlider, GridSizeSlider } from './CombinationToneMap.elements'
import { useEffect, useRef } from 'react';


// Some helper functions
const midiToNote = (midi) => {
    let octave = Math.floor(midi/12) - 1;
    
    let note = midi % 12;
    let notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    let noteName = notes[note];
    return  { noteName, octave, note };
}

let midiToFrequency = (midi) => {
    return Math.pow(2,((midi-69)/12)) * 440;
}
  
let frequencyToMidicents = (frequency) => {
    // this calculation assumes A4 = 440Hz = 6900 MIDIcents
    // https://newt.phys.unsw.edu.au/jw/notes.html
    let midicents = Math.round(6900 + 1200 * Math.log(frequency/440) / Math.log(2));
    return midicents;
} 

let calculateNote = (midicents) => {
    let cents = midicents % 100;
    let midi = (midicents - cents) / 100 ;

    return {
        midi,
        cents
    };
}

// components

export const CTControls = ( { leftMIDI, rightMIDI, gridSize, handleLeftChange, handleRightChange, handleGridChange } ) => {

    let { noteName : leftNote, octave: leftOctave } = midiToNote(leftMIDI);
    let { noteName : rightNote, octave: rightOctave } = midiToNote(rightMIDI);

    return (
        <StyledCTControls>
            <h1>Combination Tone Grid</h1>
                <Label><div>Left: {leftMIDI} {leftNote} {leftOctave} {midiToFrequency(leftMIDI).toFixed(2)} Hz</div> <NoteSlider type="range" min="1" max="108" value={leftMIDI} class="slider" onChange={handleLeftChange} id="leftSlider"/></Label>
                <Label><div>Right: {rightMIDI} {rightNote} { rightOctave } {midiToFrequency(rightMIDI).toFixed(2)} Hz</div><NoteSlider type="range" min="1" max="108" value={rightMIDI} class="slider" onChange={handleRightChange} id="rightSlider"/></Label>
                <Label>Grid Size: {gridSize} <GridSizeSlider type="range" min="1" max="16" value={gridSize} class="slider" onChange={handleGridChange} id="gridSizeSlider" /> </Label>
        </StyledCTControls>
    )
}

const GridNoteInfo = ({ noteName, octave, cents, gridSize }) => {


    return (
        <>
            <GridNoteMain> 
                <GridNoteName gridSize={gridSize}>
                    { noteName }
                </GridNoteName>
                <GridNoteCentsAndOctave gridSize={gridSize}>
                    <div>{ cents }</div>
                    <div>{ octave }</div>
                </GridNoteCentsAndOctave>
            </GridNoteMain>
            {/* <GridNoteText gridSize={gridSize}>
                { (left * midiToFrequency(leftMIDI) + right * midiToFrequency(rightMIDI)).toFixed(2)} Hz
            </GridNoteText> */}
        </>
    )
}


const GridNote = ({leftMIDI, rightMIDI, gridSize, left, right}) => {

    // return invisible space-holder for (0,0) grid
    if ( left === 0 & right === 0 ) { return <ZeroGridNote gridSize={gridSize}/> }; 

    // calculate frequency, note, cents, and octave
    let frequency = (left * midiToFrequency(leftMIDI) + right * midiToFrequency(rightMIDI));
    let midicents = frequencyToMidicents(frequency)
    let { midi, cents } = calculateNote(midicents);
    let { noteName, octave, note } = midiToNote(midi);

    return (
        <StyledGridNote gridSize={gridSize} noteWithCents={(note * 100) + cents} octave={octave}>
            <GridNoteInfo  octave={octave} noteName={noteName} cents={cents} gridSize={gridSize}/>
        </StyledGridNote>
    )
}

export const CTGrid = ( { leftMIDI, rightMIDI, gridSize } ) => {
    return (
        <StyledCTGrid >
            {
                [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].slice(0,gridSize).map((i) => {
                    return (
                        <GridColumn>
                            {
                            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].slice(0,gridSize).map((j)=>{
                                return (
                                    <GridNote leftMIDI={leftMIDI} rightMIDI={rightMIDI} gridSize={gridSize} left={i} right={j} />
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
