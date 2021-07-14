import { StyledCTGrid, GridColumn, ZeroGridNote, StyledGridNote, GridNoteMain, GridNoteName, GridNoteCentsAndOctave, StyledCTControls, StyledCTSynth, ControlContainer, ShortSlider, LongSlider, StyledCheckbox, GridNoteCentsAndOctaveDiv } from './CombinationToneMap.styles'
import { useState, useEffect, useRef } from 'react';
import { midiToFrequency, midiToNote, frequencyToMidicents, splitMidicents} from '../../../globalFunctions'


// components

export const CTControls = ( { leftMIDI, rightMIDI, gridSize, handleLeftChange, handleRightChange, handleGridChange } ) => {

    let { noteName : leftNote, octave: leftOctave } = midiToNote(leftMIDI);
    let { noteName : rightNote, octave: rightOctave } = midiToNote(rightMIDI);

    return (
        <StyledCTControls>
            <h1>Combination Tone Grid</h1>
                <ControlContainer>
                    <div>Left: {leftMIDI} {leftNote} {leftOctave} {midiToFrequency(leftMIDI).toFixed(2)} Hz</div> <ShortSlider type="range" min="1" max="108" value={leftMIDI} class="slider" onChange={handleLeftChange} id="leftSlider"/></ControlContainer>
                <ControlContainer><div>Right: {rightMIDI} {rightNote} { rightOctave } {midiToFrequency(rightMIDI).toFixed(2)} Hz</div><ShortSlider type="range" min="1" max="108" value={rightMIDI} class="slider" onChange={handleRightChange} id="rightSlider"/></ControlContainer>
                <ControlContainer>Grid Size: {gridSize} <LongSlider type="range" min="1" max="16" value={gridSize} class="slider" onChange={handleGridChange} id="gridSizeSlider" /> </ControlContainer>
        </StyledCTControls>
    )
}

export const CTSynthControls = ( { leftMIDI, rightMIDI, playOnHover, togglePlayOnHover, sustainOnClick, toggleSustainOnClick, synthVolume, handleVolumeChange } ) => {
    
    return (
        <StyledCTSynth >
            <h1>Synth Controls</h1>
            <ControlContainer>Play on hover: <StyledCheckbox type="checkbox" onChange={togglePlayOnHover} checked={playOnHover} /></ControlContainer>
            <ControlContainer>Sustain on click: <StyledCheckbox type="checkbox" onChange={toggleSustainOnClick} checked={sustainOnClick} /></ControlContainer>
            <ControlContainer>Volume: <ShortSlider type="range" min="0" max="1" step="0.01" value={synthVolume} class="slider" onChange={handleVolumeChange}  /></ControlContainer>
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
    const hoverOsc = useRef(audioContext.createOscillator())
    hoverOsc.current.connect(mainGainNode);
    hoverOsc.current.type="sine";
    hoverOsc.current.frequency.value = frequency;

    const clickOsc = useRef(audioContext.createOscillator());
    clickOsc.current.connect(mainGainNode);
    clickOsc.current.type="saw";
    clickOsc.current.frequency.value = frequency;

    // const sustainOsc = audioContext.createOscillator();
    // sustainOsc.current.connect(mainGainNode);
    // sustainOsc.current.type="sine";
    // sustainOsc.current.frequency.value = frequency;

    // handle hover
    useEffect(()=>{
        if (hover) {
            if (!hovering) {
                hoverOsc.current.start();
                setHovering(true);
            }
        }
        if (hovering & !hover) {
            hoverOsc.current.stop();
            hoverOsc.current.disconnect();
            setHovering(false);
            hoverOsc.current = audioContext.createOscillator();
            hoverOsc.current.type="triangle";
            hoverOsc.current.frequency.value = frequency;
        }
        // } else {
        //     hoverOsc.stop();
        // }
        // return (( hoverOsc )=>{ // cleanup function
        //     hoverOsc.current.stop();
        // }) 
    }, [hover]);

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

const GridNote = ({leftMIDI, rightMIDI, gridSize, left, right, playOnHover, sustainOnClick, sustainFromGrid, handleGridClick, audioContext, mainGainNode}) => {

    // set up local state for sustain
    let [ sustain, setSustain ] = useState(sustainFromGrid);
    let [ click, setClick ] = useState(0); // a hacky way to send clicks to children
    let [ hover, setHover ] = useState(false);

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
    // RGBA max is (255, 255, 255, 1)
    let max = 255;
    let hue = ((note * 100) + cents)/1200; // gives value between 0 and 3 to 3 decimal points
    if ( hue < 0 ) { hue = hue + 1 };
    let calculateColour = ( intensity ) => {
        return (0.25 - Math.pow(intensity, 2)) * 4 * max;
    }

    // this centers the hue values around (-0.5, 0.5) to use the above calculation
    // string is incomplete because transparency is calculated on the styled components side based on octave
    let colour = "rgba(" + 
        calculateColour((hue > 0.5) ? hue - 1 : hue) + ", " + 
        calculateColour((hue - 0.333) > 0.5 ? hue - 1.333 : hue - 0.333) + ", " + 
        calculateColour((hue - 0.666) < -0.5 ? hue + 0.333 : hue - 0.666) + ", "; 


    // SYNTH CONTROLS
    let handleGridNoteClick = () => {
        // play note
        console.log(frequency);
        setClick(click + 1); // triggers useEffect in synth... 

        // locally toggle sustain
        if (sustain || sustainOnClick) {
            setSustain(!sustain)
        }

        // send message to handleGridClick
        handleGridClick({i:left, j:right})
    }

    let handleGridNoteHover = () => {
        if (playOnHover) { setHover(true) };
    }

    let handleGridNoteHoverOff = () => {
        setHover(false);
    }

    return (
        <StyledGridNote onClick={handleGridNoteClick} onMouseEnter={handleGridNoteHover} onMouseLeave={handleGridNoteHoverOff} gridSize={gridSize} colour={colour} octave={octave} colourToneLeft={colourToneLeft} colourToneRight={colourToneRight}>
            <GridNoteInfo  octave={octave} noteName={noteName} cents={cents} gridSize={gridSize} sustain={sustain}/>
            <GridNoteSynth audioContext={audioContext} mainGainNode={mainGainNode} frequency={frequency} click={click} hover={hover} sustain={sustain}/>
        </StyledGridNote>
    )
}

export const CTGrid = ( { leftMIDI, rightMIDI, gridSize, playOnHover, sustainOnClick, sustainGrid, handleGridClick, audioContext, mainGainNode } ) => {

    // this can be greatly updated to keep a matrix of GridNote references alongside the sustainGrid

    return (
        <StyledCTGrid >
            {
                [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].slice(0,gridSize).map((i) => {
                    return (
                        <GridColumn>
                            {
                            [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].slice(0,gridSize).map((j)=>{
                                return (
                                    <GridNote 
                                        leftMIDI={leftMIDI} 
                                        rightMIDI={rightMIDI} 
                                        gridSize={gridSize} 
                                        left={i} right={j} 
                                        playOnHover={playOnHover}
                                        sustainOnClick={sustainOnClick}
                                        handleGridClick={handleGridClick}
                                        sustainFromGrid={sustainGrid[i][j]}
                                        audioContext={audioContext}
                                        mainGainNode={mainGainNode}/>
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

