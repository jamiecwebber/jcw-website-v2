import { StyledCTGrid, GridColumn, ZeroGridNote, StyledGridNote, GridNoteMain, GridNoteName, GridNoteCentsAndOctave, StyledCTControls, ControlContainer, ShortSlider, LongSlider } from './CombinationToneMap.styles'
import { useEffect, useRef } from 'react';
import { midiToFrequency, midiToNote, frequencyToMidicents, splitMidicents} from '../../../globalFunctions'


// components

export const CTControls = ( { leftMIDI, rightMIDI, gridSize, handleLeftChange, handleRightChange, handleGridChange } ) => {

    let { noteName : leftNote, octave: leftOctave } = midiToNote(leftMIDI);
    let { noteName : rightNote, octave: rightOctave } = midiToNote(rightMIDI);

    return (
        <StyledCTControls>
            <h1>Combination Tone Grid</h1>
                <ControlContainer><div>Left: {leftMIDI} {leftNote} {leftOctave} {midiToFrequency(leftMIDI).toFixed(2)} Hz</div> <ShortSlider type="range" min="1" max="108" value={leftMIDI} class="slider" onChange={handleLeftChange} id="leftSlider"/></ControlContainer>
                <ControlContainer><div>Right: {rightMIDI} {rightNote} { rightOctave } {midiToFrequency(rightMIDI).toFixed(2)} Hz</div><ShortSlider type="range" min="1" max="108" value={rightMIDI} class="slider" onChange={handleRightChange} id="rightSlider"/></ControlContainer>
                <ControlContainer>Grid Size: {gridSize} <LongSlider type="range" min="1" max="16" value={gridSize} class="slider" onChange={handleGridChange} id="gridSizeSlider" /> </ControlContainer>
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

    // determine whether this note is part of a fibonacci-like series
    // could be edited to take into account gridSize and not have to use an array
    let colourToneLeft = false;
    let colourToneRight = false;
    let fibSeries = [1,1,2,3,5,8,13,21];
    for (let i = 0; i < 7; i++) { 
        if ( fibSeries[i] === right && fibSeries[i - 1] === left ) { colourToneRight = true; }
        else if ( fibSeries[i] === left && fibSeries[i - 1] === right ) { colourToneLeft = true; };
    }

    // this calcultates RGBA value for note (this is here rather than in styles for efficiency)
    // transparency is calculated on the styled components side based on octave
    // RGBA max is (255, 255, 255, 1)
    let max = 255;
    let hue = ((note * 100) + cents)/1200; // gives value between 0 and 3 to 3 decimal points
    if ( hue < 0 ) { hue = hue + 1 };
    let calculateColour = ( intensity ) => {
        return (0.25 - Math.pow(intensity, 2)) * 4 * max;
    }

    // this centers the hue values around (-0.5, 0.5) to use the above calculation
    let colour = "rgba(" + 
        calculateColour((hue > 0.5) ? hue - 1 : hue) + ", " + 
        calculateColour((hue - 0.333) > 0.5 ? hue - 1.333 : hue - 0.333) + ", " + 
        calculateColour((hue - 0.666) < -0.5 ? hue + 0.333 : hue - 0.666) + ", "; 

    return (
        <StyledGridNote gridSize={gridSize} colour={colour} octave={octave} colourToneLeft={colourToneLeft} colourToneRight={colourToneRight}>
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

