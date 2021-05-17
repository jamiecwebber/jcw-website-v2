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

export const CTGrid = styled.div`
    display: flex;
    flex-direction: column-reverse;
    border: 1px solid red;
    flex-grow: 3;
`

export const CTGridRow = styled.div`
    display: flex;
    flex-direction: row;
`

export const GridNote = styled.div`
    border: 1px solid gray;
    border-radius: 3px;
    margin: 2px;
    height: 4rem;
    width: 4rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &:hover {
            background-color: Thistle;
            transition: all 0.3s ease;
        }
`

export const GridLine = styled.div`
    font-size: 0.8rem;
`

export const GridLineBig = styled.div`
    font-size: 1rem;
    font-weight: bold;
`