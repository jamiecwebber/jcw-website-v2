import { useState, useEffect, useRef } from 'react'
import { CTContainer, StyledControlsContainer } from './CombinationToneMap.styles'
import { CTGrid, CTControls, CTSynthControls } from './CombinationToneMap.components'
 
const CTMap = (
) => {
    // Grid controls
    const [leftMIDI, setLeftMIDI] = useState(40);
    const [rightMIDI, setRightMIDI] = useState(47);
    const [gridSize, setGridSize] = useState(8);
    const [sustainGrid, setSustainGrid] = useState([...Array(16)].map(x=>Array(16).fill(false))); 

    const handleLeftChange = (event) => { setLeftMIDI(event.target.value);}
    const handleRightChange = (event) => { setRightMIDI(event.target.value);}
    const handleGridChange = (event) => { // edit to change sustain grid as well

        setGridSize(event.target.value);
    }

    // Synth controls
    let [playOnHover, setPlayOnHover] = useState(true);
    let [sustainOnClick, setSustainOnClick] = useState(true);
    let [synthVolume, setSynthVolume] = useState(0.6);

    let togglePlayOnHover = () => {setPlayOnHover(!playOnHover)};
    let toggleSustainOnClick = () => { setSustainOnClick(!sustainOnClick) };

    let handleGridClick = ({i,j}) => {
        console.log(i);
        console.log(j);

        // play note

        // if sustain is on, add to sustain grid
        if (sustainGrid[i][j] || sustainOnClick) {
            let newGrid = sustainGrid;
            newGrid[i][j] = !newGrid[i][j]
            setSustainGrid(newGrid);
        }
    };

    // Audio Context
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioContext = new AudioContext();
    
    const mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = synthVolume;

    let handleVolumeChange = (event) => { 
        setSynthVolume(event.target.value);
        mainGainNode.value(synthVolume); 
    };

    return (
        <CTContainer>
            <StyledControlsContainer>
                <CTControls 
                    leftMIDI={leftMIDI} handleLeftChange={handleLeftChange}
                    rightMIDI={rightMIDI} handleRightChange={handleRightChange}
                    gridSize={gridSize} handleGridChange={handleGridChange} />
                <CTSynthControls leftMIDI={leftMIDI} rightMIDI={rightMIDI} 
                    playOnHover={playOnHover} togglePlayOnHover={togglePlayOnHover}
                    sustainOnClick={sustainOnClick} toggleSustainOnClick={toggleSustainOnClick}
                    synthVolume={synthVolume} handleVolumeChange={handleVolumeChange}/>
            </StyledControlsContainer>
            <CTGrid 
                leftMIDI={leftMIDI} 
                rightMIDI={rightMIDI} 
                gridSize={gridSize} 
                sustainGrid={sustainGrid}
                playOnHover={playOnHover}
                sustainOnClick={sustainOnClick}
                handleGridClick={handleGridClick}
                audioContext={audioContext}
                mainGainNode={mainGainNode}/>
        </CTContainer>
    )
}

export default CTMap