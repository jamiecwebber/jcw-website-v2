import styled from 'styled-components'
import { Container } from '../../../globalStyles'
import greybackground from '../../../images/greybackground.jpg'

export const CTContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    height: calc(100vh - 50px); 
    width: 100vw;

    background-image: url(${greybackground});
    background-repeat: repeat;

    @media screen and (max-width: 991px) {
        flex-direction: column;
    }
`

export const StyledControlsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 7vh;
    margin-right: 3vh;
`

export const StyledCTControls = styled.div`
    border: 8px solid mediumpurple ;
    border-radius: 15px;
    background-color: peachpuff;
    padding: 20px;
`

export const ControlContainer = styled.div`
    width: 95%;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`

export const ShortSlider = styled.input`
    width: 50%;
`

export const LongSlider = styled.input`
    width: 70%;
`

export const StyledCheckbox = styled.input`

`


export const StyledCTSynth = styled.div`
    width: 60%;
    /* height: 30%; */
    margin-top: 7vh;
    margin-right: 3vh;

    border: 8px solid limegreen;
    border-radius: 15px;
    background-color: cyan;

    padding: 20px;
`

export const StyledCTGrid = styled.div`
    display: grid;
    grid-auto-flow: column;
    width: 55vh;
    height: 55vh;
    margin-top: 23vh;
    margin-right: 15vh;
    rotate: -135deg;
`
export const GridColumn = styled.div`
    display: grid;
    grid-auto-flow: row;
`

export const ZeroGridNote = styled.div`
    margin: 1px;
    background-color: transparent;
    rotate: -180deg;
    width: ${({gridSize}) => ((55/gridSize) + "vh")};
    height: ${({gridSize}) => ((55/gridSize) + "vh")};
`

export const StyledGridNote = styled.div`
    border: ${({colourToneRight, colourToneLeft }) => ( colourToneRight ? "3px solid aqua" : colourToneLeft ? "3px solid deeppink" : "1px solid gray")};
    border-radius: "3px";
    margin: 1px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ colour, octave }) => (colour + (0.8 - (octave * 0.07 ))) + ")"};
    rotate: -180deg;
    width: ${({gridSize}) => ((55/gridSize) + "vh")};
    height: ${({gridSize}) => ((55/gridSize) + "vh")};
    
    &:hover {
        background-color: ${({ colour, octave }) => (colour + (0.95 - (octave * 0.05 ))) + ")"};;
        transition: all 0.2s ease;
        cursor: pointer;
    }
`

export const GridNoteMain = styled.div`
    rotate: -45deg;
    width: 95%;
    height: 95%;
    padding: 10%;
    display: flex;
    justify-content: space-around;
    flex-direction:row;
    color: ${({sustain}) => (sustain ? "lawngreen" : "default")};
    border: ${({sustain}) => (sustain ? "2px solid darkgreen" : "default")};
    background-color: ${({sustain}) => (sustain ? "green" : "default")};
    border-radius: 50%;
`

export const GridNoteName = styled.h1`
    font-size: ${({gridSize}) => ((25/gridSize) + "vh") } ;
    color: inherit;
    display: flex;
    align-items: center;
`

export const GridNoteCentsAndOctave = styled.div`
    display: flex;
    color: inherit;
    flex-direction: column;
    align-items: center;
    font-size: ${({gridSize}) => ((15/gridSize) + "vh") } ;
`

export const GridNoteCentsAndOctaveDiv = styled.div`
    color: inherit;
`
