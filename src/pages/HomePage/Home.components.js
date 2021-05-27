import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { Container } from '../../globalStyles'  // important for resizing w mobile

const SplashContainer = styled(Container)`
    z-index: 99;
    background-color: lightpink;
    border: 3px solid pink;
    height: 80vh;
    margin-top: min(5vw, 5vh);
    margin-bottom: 5vh;
    width: 100%;
    background-image: url(${({ img }) => ( img )}); // 4096 * 3072
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`

// const SplashImage = styled.div`
//     width: 132vh;
//     padding-top: 75%; /* 4:3 Aspect Ratio */
//     position: relative; /* If you want text inside of it */
//     border: 5px solid green;

// `

const SplashWelcomeHeader = styled.h1`
    position: absolute;
    font-style: oblique;
    font-size: fit;
    color: lightpink; 
    background-color: rgba(0, 15, 35, 0.6); 
    border: 3px solid palevioletred;
    margin-left: 30%;
    transform: translateX(-40%);
    margin-top: 12vh;
    padding-bottom: 8vh;
    padding: 4vh;
    /* height: 30vh; */
    width: 60vw;
    max-width: 50vh;
    max-height: 40vh;
    min-width: 250px;
    font-family: 'Apple Chancery', cursive;
`

export const HomepageSplash = (homepagebackground) => {
    return (
        <SplashContainer img={require('../../images/homepagebackground.jpg').default}>
            {/* <SplashImage > */}
                <SplashWelcomeHeader>Thank you for visiting my website</SplashWelcomeHeader>
            {/* </SplashImage> */}
        </SplashContainer>
    )

}