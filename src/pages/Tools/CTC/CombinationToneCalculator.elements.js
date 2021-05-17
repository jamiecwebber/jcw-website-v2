import styled from 'styled-components'
import { Container } from '../../../globalStyles'

export const CTContainer = styled(Container)`
    display: flex;
    flex-direction: row;
    height: 70vh;
    margin-top: 15px;
`

export const CTControls = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
`

export const CTGrid = styled.div`
    display: grid;
`

export const Label = styled.div`
    width: 100%;
    margin-top: 5px;
    display: flex;
    justify-content: space-between;
`

export const NoteSlider = styled.input`
    width: 80%;
`