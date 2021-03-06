import styled from 'styled-components';
import { FaMagento } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Container } from '../../globalStyles';

export const Nav = styled.nav`
    background-color: Turquoise;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
    position: sticky;
    top: 0;
    z-index: 999;

    @media screen and (max-width: 960px) {
        height: 80px;
    };
`;

export const NavbarContainer = styled(Container)`
    display: flex;
    justify-content: space-between;
    height: 50px;
    margin-top: 0px;

    ${Container}

    @media screen and (max-width: 960px) {
        height: 80px;
    };
`;

export const NavTitleContainer = styled.div`
    display: flex;
    justify-content: center;

    @media screen and (max-width: 960px) {
        flex-direction: column;
    };
`

export const NavLogo = styled(Link)`
    
    color: #5c3a2c;
    justify-self: flex-start;
    cursor: pointer;
    text-decoration: none;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    margin-right: 3px;
`;

// export const NavSubtitle = styled.h2`

// color: WhiteSmoke;
//     justify-self: flex-start;
//     cursor: pointer;
//     text-decoration: none;
//     font-size: 1.3rem;   
// `

export const NavIcon = styled(FaMagento)`
    margin-right: 0.5rem;
`;

export const MobileIcon = styled.div`
    display: none;

    @media screen and (max-width: 960px){
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    text-align: center;

    @media screen and (max-width: 960px) {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 90vh;
        position: absolute;
        top: 80px;
        left: ${({click}) => (click ? 0 : '-100%')};
        opacity: 1;
        transition: all 0.5s ease;
        background: WhiteSmoke;
    }
`;

export const NavItem = styled.li`
    height: 50px;
    border-bottom: 5px solid transparent;

    &:hover {
        border-bottom: 5px solid Thistle;
    }

    @media screen and (max-width: 960px) {
        width: 100%;
        height: 80px;

        &:hover {
            border: none;
        }
    }
`;

export const NavLinks = styled(Link)`
    color: WhiteSmoke;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    height: 100%;

    @media screen and (max-width: 960px) {
        color: turquoise;
        text-align: center;
        padding: 2rem;
        width: 100%;
        display: table;

        &:hover {
            color: Thistle;
            transition: all 0.3s ease;
        }
    }
`; 

export const NavItemBtn = styled.li`
    @media screen and (max-width: 960px) {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 120px;
    }
`;

export const NavBtnLink = styled(Link)`
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    padding: 8px 16px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
`;