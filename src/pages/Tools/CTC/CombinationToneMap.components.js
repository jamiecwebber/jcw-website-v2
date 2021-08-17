import { StyledCTGrid, GridColumn, ZeroGridNote, StyledGridNote, GridNoteMain, GridNoteName, GridNoteCentsAndOctave, StyledCTControls, StyledCTSynth, ControlContainer, ShortSlider, LongSlider, StyledCheckbox, GridNoteCentsAndOctaveDiv } from './CombinationToneMap.styles'
import { useState, useEffect, useRef, useContext } from 'react';
import { midiToFrequency, midiToNote, frequencyToMidicents, splitMidicents} from '../../../globalFunctions';
import { CTX } from './CombinationToneMap.context'

// components

export const CTControls = ( { change } ) => {
    const [appState, updateState] = useContext(CTX);
    const { leftMIDI, rightMIDI, gridSize } = appState.gridSettings;

    let { noteName : leftNote, octave: leftOctave } = midiToNote(leftMIDI);
    let { noteName : rightNote, octave: rightOctave } = midiToNote(rightMIDI);
    
    const handleLeftChange = (e) => {
        let { value } = e.target;
        updateState({type: "CHANGE_LEFT_MIDI", payload: { value }});
    }
    const handleRightChange = (e) => {
        let { value } = e.target;
        updateState({type: "CHANGE_RIGHT_MIDI", payload: { value }});
    }
    const handleGridChange = (e) => {
        let {value} = e.target;
        updateState({type: "CHANGE_GRID_SIZE", payload: { value }});
    }

    return (
        <StyledCTControls>
            <h1>Combination Tone Grid</h1>
                <ControlContainer>
                    <div>Left: {leftMIDI} {leftNote} {leftOctave} {midiToFrequency(leftMIDI).toFixed(2)} Hz</div> <ShortSlider type="range" min="1" max="108" value={leftMIDI} class="slider" onChange={handleLeftChange} id="leftMIDI"/></ControlContainer>
                <ControlContainer><div>Right: {rightMIDI} {rightNote} { rightOctave } {midiToFrequency(rightMIDI).toFixed(2)} Hz</div><ShortSlider type="range" min="1" max="108" value={rightMIDI} class="slider" onChange={handleRightChange} id="rightMIDI"/></ControlContainer>
                <ControlContainer>Grid Size: {gridSize} <LongSlider type="range" min="1" max="17" value={gridSize} class="slider" onChange={handleGridChange} id="gridSizeSlider" /> </ControlContainer>
        </StyledCTControls>
    )
}

export const CTSynthControls = ( ) => {
    const [appState, updateState] = useContext(CTX);
    // Synth controls
    let { synthVolume, playOnHover, sustainOnClick } = appState.synthSettings;

    const togglePlayOnHover = (e) => {
        // playOnHover = !playOnHover;  -- not sure this line is needed, will find out when synth makes sound
        updateState({type: "TOGGLE_PLAY_ON_HOVER"});
    }
    const toggleSustainOnClick = (e) => { 
        updateState({type: "TOGGLE_SUSTAIN_ON_CLICK"});
    };
    let handleVolumeChange = (e) => { 
        let { value } = e.target;
        updateState({type: "CHANGE_MASTER_VOLUME", payload: { value }});
    };


    return (
        <StyledCTSynth >
            <h1>Synth Controls</h1>
            <ControlContainer>Play on hover: <StyledCheckbox id="playOnHover" type="checkbox" onChange={togglePlayOnHover} checked={playOnHover} /></ControlContainer>
            <ControlContainer>Sustain on click: <StyledCheckbox id="sustainOnClick" type="checkbox" onChange={toggleSustainOnClick} checked={sustainOnClick} /></ControlContainer>
            <ControlContainer>Volume: <ShortSlider id="volume" type="range" min="0" max="1" step="0.01" value={synthVolume} class="slider" onChange={handleVolumeChange}  /></ControlContainer>
        </StyledCTSynth>
    )
}


const GridNoteInfo = ({ noteName, octave, cents, gridSize, sustain }) => {

    return (
        <>
            <GridNoteMain sustain={sustain}> 
                <GridNoteName gridSize={gridSize} >
                    { noteName }
                </GridNoteName>
                <GridNoteCentsAndOctave gridSize={gridSize}>
                    <GridNoteCentsAndOctaveDiv>{ (cents > 0 ? "+" + cents : cents) }</GridNoteCentsAndOctaveDiv>
                    <GridNoteCentsAndOctaveDiv>{ octave }</GridNoteCentsAndOctaveDiv>
                </GridNoteCentsAndOctave>
            </GridNoteMain>
            {/* <GridNoteText gridSize={gridSize}>
                { (left * midiToFrequency(leftMIDI) + right * midiToFrequency(rightMIDI)).toFixed(2)} Hz
            </GridNoteText> */}
        </>
    )
}

const GridNoteSynth = ({audioContext, mainGainNode, frequency, hover, click, sustain }) => {

    const [hovering, setHovering] = useState(hover);

    // create three new synths and connect them to the audioContext's mainGainNode
    // const hoverOsc = useRef(audioContext.createOscillator())
    // hoverOsc.current.connect(mainGainNode);
    // hoverOsc.current.type="sine";
    // hoverOsc.current.frequency.value = frequency;

    // const clickOsc = useRef(audioContext.createOscillator());
    // clickOsc.current.connect(mainGainNode);
    // clickOsc.current.type="saw";
    // clickOsc.current.frequency.value = frequency;

    // const sustainOsc = audioContext.createOscillator();
    // sustainOsc.current.connect(mainGainNode);
    // sustainOsc.current.type="sine";
    // sustainOsc.current.frequency.value = frequency;

    // handle hover
    // useEffect(()=>{
    //     if (hover) {
    //         if (!hovering) {
    //             hoverOsc.current.start();
    //             setHovering(true);
    //         }
    //     }
    //     if (hovering & !hover) {
    //         hoverOsc.current.stop();
    //         hoverOsc.current.disconnect();
    //         setHovering(false);
    //         hoverOsc.current = audioContext.createOscillator();
    //         hoverOsc.current.type="triangle";
    //         hoverOsc.current.frequency.value = frequency;
    //     }
    //     // } else {
    //     //     hoverOsc.stop();
    //     // }
    //     // return (( hoverOsc )=>{ // cleanup function
    //     //     hoverOsc.current.stop();
    //     // }) 
    // }, [hover]);

    // handle click
    // useEffect(()=>{ 
    //     console.log("click effect");
    //     clickOsc.current.start();
    //     clickOsc.current.stop(audioContext.currentTime + 0.5);
        
    // }, [click])

    // // handle sustain
    // useEffect((sustainOsc)=>{
    //     console.log("sustain effect");

    //     return ((sustainOsc)=>{ // cleanup function
    //         sustainOsc.disconnect();
    //     }) 
    // }, [sustain])

    return (
        <></>
    )
}


// make array of 36 colour strings

// this calcultates RGBA value for note (this is here rather than in styles for efficiency)
// RGBA max is (255, 255, 255, 1)
const calculateColour = ( intensity ) => {
    return (0.25 - Math.pow(intensity, 2)) * 4 * 255;
}

const colourStrings = 
[...Array(36).keys()].map((note)=>{
    let hue = note / 36;
    return ("rgba(" + 
    calculateColour((hue > 0.5) ? hue - 1 : hue) + ", " + 
    calculateColour((hue - 0.333) > 0.5 ? hue - 1.333 : hue - 0.333) + ", " + 
    calculateColour((hue - 0.666) < -0.5 ? hue + 0.333 : hue - 0.666) + ", ");
})

// note: value between 0 and 11 for C to B
// note : value between 0 and 35 for C𝄯 to B𝄮
// let hue = ((note * 100) + cents)/1200; // gives value between 0 and 1 to 3 decimal points
// if ( hue < 0 ) { hue = hue + 1 };


// // this centers the hue values around (-0.5, 0.5) to use the above calculation
// // string is incomplete because transparency is calculated on the styled components side based on octave
// let colour = "rgba(" + 
//     calculateColour((hue > 0.5) ? hue - 1 : hue) + ", " + 
//     calculateColour((hue - 0.333) > 0.5 ? hue - 1.333 : hue - 0.333) + ", " + 
//     calculateColour((hue - 0.666) < -0.5 ? hue + 0.333 : hue - 0.666) + ", "; 




const GridNote = ({ left, right }) => {

    const [appState, updateState] = useContext(CTX);
    let { leftMIDI, rightMIDI, gridSize } = appState.gridSettings;
    let { playOnHover, sustainOnClick } = appState.synthSettings;

    // set up local state for sustain
    let [ sustain, setSustain ] = useState(false);

    // return invisible space-holder for (0,0) grid
    if ( left === 0 & right === 0 ) { return <ZeroGridNote gridSize={gridSize}/> }; 

    // calculate frequency, note, cents, and octave
    let frequency = (left * midiToFrequency(leftMIDI) + right * midiToFrequency(rightMIDI));
    let midicents = frequencyToMidicents(frequency)
    let { midi, cents, noteName, octave, note } = splitMidicents(midicents);

    // determine whether this note is part of a fibonacci-like series
    // could be edited to take into account gridSize and not have to use an array
    let colourToneLeft = false;
    let colourToneRight = false;
    let fibSeries = [1,1,2,3,5,8,13,21];
    for (let i = 0; i < 7; i++) { 
        if ( fibSeries[i] === right && fibSeries[i - 1] === left ) { colourToneRight = true; }
        else if ( fibSeries[i] === left && fibSeries[i - 1] === right ) { colourToneLeft = true; };
    }

    // SYNTH CONTROLS

    let handleGridNoteHover = () => {
        if (playOnHover) {  
            let value = { left, right, frequency };
            updateState({type: "GRID_NOTE_HOVER_ON", payload: { value }});
        };      
    }

    let handleGridNoteHoverOff = () => {
        if (playOnHover) {
            let value = { left, right };
            updateState({type: "GRID_NOTE_HOVER_OFF", payload: { value }});
        };
    }

    let handleGridClick = () => {
        console.log(left);
        console.log(right);
        console.log(frequency);
        if (sustain || sustainOnClick) {
            let value = { left, right, frequency };
            if (sustain) {
                updateState({type: "GRID_NOTE_SUSTAIN_OFF", payload: { value }});
            } else {
                updateState({type: "GRID_NOTE_SUSTAIN_ON", payload: { value }});
            }
            setSustain(!sustain); // locally toggle sustain
        }
    };

    return (
        <StyledGridNote onClick={handleGridClick} onMouseEnter={handleGridNoteHover} onMouseLeave={handleGridNoteHoverOff} gridSize={gridSize} colour={colourStrings[note]} octave={octave} colourToneLeft={colourToneLeft} colourToneRight={colourToneRight}>
            <GridNoteInfo  octave={octave} noteName={noteName} cents={cents} gridSize={gridSize} sustain={sustain}/>
        </StyledGridNote>
    )
}

export const CTGrid = ( { sustainGrid, handleGridClick } ) => {

    const [appState, updateState] = useContext(CTX);
    const { gridSize } = appState.gridSettings;

    return (
        <StyledCTGrid >
            {
                [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].slice(0,gridSize).map((i) => {
                    return (
                        <GridColumn>
                            {
                            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].slice(0,gridSize).map((j)=>{
                                return (
                                    <GridNote left={i} right={j} />
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

