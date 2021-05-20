import styled from 'styled-components'
import { Container } from '../../../globalStyles'

export const CTContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    height: 80vh;
    margin-top: 15px;

    @media screen and (max-width: 991px) {
        flex-direction: column;
    }
`

export const CTControls = styled.div`
    flex-grow: 1;
`

export const Label = styled.div`
    width: 90%;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`

export const NoteSlider = styled.input`
    width: 70%;
`

export const StyledCTGrid = styled.div`
    display: grid;
    /* grid-template-columns: repeat( ${({gridSize})=>(gridSize)}, 1 fr);
    grid-template-rows: repeat( ${({gridSize})=>(gridSize)}, 1 fr); */
    width: 55vh;
    height: 55vh;
    margin-top: 14vh;
    margin-right: 7vh;
    rotate:-45deg;
`
export const GridRow = styled.div`
    display: grid;
    grid-auto-flow: column;
    /* grid-template-columns: repeat( ${({gridSize})=>(gridSize)}, 1 fr); */
`

export const GridNote = styled.div`
    border: 1px solid gray;
    border-radius: 3px;
    margin: 2px;
    background-color: lightpink;


    &:hover {
            background-color: Thistle;
            transition: all 0.3s ease;
        }
`

