import styled, {createGlobalStyle} from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Source Sans Pro', sans-serif;
        color: maroon;
    }
`;

export const Container = styled.div`
    z-index: 1;
    width: 100%;
    max-width: 1200px;
    margin-right: auto;
    margin-left: auto;

    margin-top: min(5vw, 5vh);
    padding-right: 50px;
    padding-left: 50px;

    @media screen and (max-width: 991px) {
        padding-right: 30px;
        padding-left: 30px;
    }
`;

export const Button = styled.button`
    border-radius: 4px;
    background: ${({primary}) => (primary ? 'crimson' : '#0467FB')};
    white-space: nowrap;
    padding: ${({big}) => (big ? '12px 64px' : '10px 20px')};
    color: #fff;
    font-size: ${({fontBig}) => ( fontBig ? '20px' : '16px' )};
    outline: none;
    border: none;
    cursor: pointer;

    &:hover {
        transition: all 0.3s ease-out;
        background: #fff;
        background: ${({primary}) => (primary ? 'crimson' : '#0467FB')};
    }

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;

export default GlobalStyle;