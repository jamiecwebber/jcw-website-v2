import { useState, useEffect, useRef, useContext } from 'react'
import { CTContainer, StyledControlsContainer } from './CombinationToneMap.styles'
import { CTGrid, CTControls, CTSynthControls } from './CombinationToneMap.components'

import { CTX } from './CombinationToneMap.context'

const CTMap = (
) => {
    const [appState, updateState] = useContext(CTX);

    // Grid controls

    let { leftMIDI, rightMIDI, gridSize } = appState.gridSettings;
    
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

    // Synth controls
    let { synthVolume, playOnHover, sustainOnClick } = appState.synthSettings;

    const togglePlayOnHover = () => {
        updateState({type: "TOGGLE_PLAY_ON_HOVER"});
    }
    const toggleSustainOnClick = () => { 
        updateState({type: "TOGGLE_SUSTAIN_ON_CLICK"});
    };
    let handleVolumeChange = (e) => { 
        let { value } = e.target;
        updateState({type: "CHANGE_MASTER_VOLUME", payload: { value }});
    };



    const [sustainGrid, setSustainGrid] = useState([...Array(16)].map(x=>Array(16).fill(false))); 

    let handleGridClick = ({i,j}) => {
        console.log(i);
        console.log(j);

        // // play note

        // if sustain is on, add to sustain grid
        // if (sustainGrid[i][j] || sustainOnClick) {
        //     let newGrid = sustainGrid;
        //     newGrid[i][j] = !newGrid[i][j]
        //     setSustainGrid(newGrid);
        // }
    };

    return (
            <CTContainer>
                <StyledControlsContainer>
                    <CTControls 
                        handleLeftChange={handleLeftChange}
                        handleRightChange={handleRightChange}
                        handleGridChange={handleGridChange} />
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
                    audioContext={CTX.actx}
                    mainGainNode={CTX.masterGain}/>
            </CTContainer>
    )
}

export default CTMap