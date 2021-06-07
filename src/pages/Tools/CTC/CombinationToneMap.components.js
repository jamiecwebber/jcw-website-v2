import { StyledCTGrid, GridColumn, ZeroGridNote, StyledGridNote, GridNoteMain, GridNoteName, GridNoteCentsAndOctave, StyledCTControls, Label, NoteSlider, GridSizeSlider } from './CombinationToneMap.styles'
import { useEffect, useRef } from 'react';
import { midiToFrequency, midiToNote, frequencyToMidicents, splitMidicents} from '../../../globalFunctions'


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
    let { midi, cents } = splitMidicents(midicents);
    let { noteName, octave, note } = midiToNote(midi);

    // calcultate RGBA value for note (this is here rather than in styles for efficiency)
    // RGBA max is (255, 255, 255, 1)
    let max = 255;
    let hue = ((note * 100) + cents)/400; // gives value between 0 and 3 to 3 decimal points
    // 0 and 3 should be max red, 1 max green, 2 max blue. If they all ramp up and down over 0.33, that makes: 
    let calculateColour = ( intensity ) => {
        intensity = intensity > 2 ? Math.abs( ( 3 - intensity ) ) : Math.abs(intensity); // shifts the red values between 2 and 3 to 1 and 0.
        return ( intensity > 1 ) ? ( 0 ) : ( intensity * max );
    }
    // transparency is calculated on the styled components side based on octave
    let colour = "rgba(" + calculateColour(hue) + ", " + calculateColour(hue - 1) + ", " + calculateColour(hue - 2) + ", "; 

    // "hsl(" + ((noteWithCents/1200 * 360)) + ", 80%, " + ((octave * 5 ) + 40) + "%)"

    return (
        <StyledGridNote gridSize={gridSize} colour={colour} octave={octave}>
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
