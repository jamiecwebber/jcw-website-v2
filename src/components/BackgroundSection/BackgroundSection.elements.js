import styled from 'styled-components'

export const ColourBlock = styled.div`
    margin: 30px;
    padding: 60px 30px;
    background: ${({ background }) => ( background ? background : 'RebeccaPurple' )};
`;

export const BackgroundBlock = styled.div`
    background-image: url(${({ img }) => ( img )});
    background-repeat: repeat;
    min-height: 350px;
    margin-bottom: 30px;
    padding-top: 55px;
    padding-left: 25px;
    flex: 1;
    max-width: 110%;
    flex-basis: 50%;

    /* @media screen and (max-width: 768px) {
        max-width: 100%;
        flex-basis: 100%;
        display: flex;
        justify-content: center;
    } */
`

