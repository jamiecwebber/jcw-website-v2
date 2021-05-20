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



export const StyledCTControls = styled.div`
    width: 33%;
    height: 25%;
    margin-top: 7vh;
    margin-right: 3vh;

    border: 8px solid limegreen;
    border-radius: 15px;
    background-color: mediumpurple;

    padding: 20px;
`

export const Label = styled.div`
    width: 95%;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`

export const NoteSlider = styled.input`
    width: 50%;
`

export const GridSizeSlider = styled.input`
    width: 70%;
`



export const StyledCTGrid = styled.div`
    display: grid;
    grid-auto-flow: column;
    width: 55vh;
    height: 55vh;
    margin-top: 20vh;
    margin-right: 15vh;
    rotate: -135deg;
`
export const GridColumn = styled.div`
    display: grid;
    grid-auto-flow: row;
`

export const GridNote = styled.div`
    border: 1px solid gray;
    border-radius: 3px;
    margin: 2px;
    background-color: lightpink;
    rotate: -180deg;
    width: ${({gridSize}) => ((55/gridSize) + "vh")};
    height: ${({gridSize}) => ((55/gridSize) + "vh")};

    &:hover {
            background-color: Thistle;
            transition: all 0.3s ease;
        }
`

export const GridNoteText = styled.div`
    margin-top: 15px;
    rotate: -45deg;
`

