import { StyledCTSynth, ControlContainer, StyledCheckbox, ShortSlider } from './CombinationToneMap.styles'
import { useState } from 'react'

// CT SYNTH


export const CTSynth = ( { leftMIDI, rightMIDI } ) => {
    
    let [playOnHover, setPlayOnHover] = useState(true);
    let togglePlayOnHover = () => {setPlayOnHover(!playOnHover)};

    let [sustainOnClick, setSustainOnClick] = useState(true);
    let toggleSustainOnClick = () => { setSustainOnClick(!sustainOnClick) };

    let [volume, setVolume] = useState(0.6);
    let handleVolumeChange = (event) => { setVolume(event.target.value) };


    let audioContext = new AudioContext();



    return (
        <StyledCTSynth >
            <h1>Synth Controls</h1>
            <ControlContainer>Play on hover: <StyledCheckbox type="checkbox" onChange={togglePlayOnHover} checked={playOnHover} /></ControlContainer>
            <ControlContainer>Sustain on click: <StyledCheckbox type="checkbox" onChange={toggleSustainOnClick} checked={sustainOnClick} /></ControlContainer>
            <ControlContainer>Volume: <ShortSlider type="range" min="0" max="1" step="0.01" value={volume} class="slider" onChange={handleVolumeChange}  /></ControlContainer>
        </StyledCTSynth>
    )
}
