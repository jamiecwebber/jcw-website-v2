import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { Container } from '../../globalStyles'  // important for resizing w mobile

const SplashContainer = styled(Container)`
    z-index: 99;
    background-image: url(${({ img }) => ( img )});
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: lightpink;
    border: 3px solid pink;
    height: 80vh;
    margin-top: 5vh;
    margin-bottom: 5vh;
    width: 100%;
`

const SplashWelcomeHeader = styled.h1`
    font-style: oblique;
    font-size: 8vh;
    color: lightpink;
    margin-left: 15%;
    margin-top:15%;
    width: 60%;
    font-family: 'Apple Chancery', cursive;
`

export const HomepageSplash = (homepagebackground) => {
    return (
        <SplashContainer img={require('../../images/homepagebackground.jpg').default}>
            <SplashWelcomeHeader>Thank you for visiting my website</SplashWelcomeHeader>
        
        </SplashContainer>
    )

}