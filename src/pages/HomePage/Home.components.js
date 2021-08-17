import styled from 'styled-components'
import { useEffect, useRef } from 'react'
import { Container } from '../../globalStyles'  // important for resizing w mobile
import RainbowVideo from '../../images/welcomeSplash.mp4'

const SplashContainer = styled(Container)`
    z-index: 99;
    background-color: lightpink;
    border: 15px solid pink;
    height: 80vh
    margin-bottom: 3vh;
    width: 100%;
    background-image: url(${({ img }) => ( img )}); // 4096 * 3072
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
`

const SplashImage = styled.div`
    width: 132vh;
     padding-top: 75%; /* 4:3 Aspect Ratio */
     position: relative; /* If you want text inside of it */
     border: 5px solid green;
 `

const SplashWelcomeHeader = styled.h1`
    position: relative;
    font-style: oblique;
    font-size: fit;
    color: lightpink; 
    background-color: rgba(0, 15, 35, 0.6); 
    margin-left: 15%;
    margin-top: 12vh;
    padding-bottom: 8vh;
    padding: 4vh;
    width: 45%;
    /* max-width: 30vh; */
    max-height: 40vh;
    /* min-width: 250px; */
    font-family: 'Apple Chancery', cursive;
`

const SplashVideo = styled.video`
    width: 100%;
    max-height: 76vh;
    padding-top: 2vh;
    padding-bottom: 2vh;
 `

export const HomepageSplash = (homepagebackground) => {
    return (
        <SplashContainer>
            
            <SplashVideo controls>
                <source src={RainbowVideo} type="video/webm" />
                {/*<SplashWelcomeHeader>Thank you for visiting my website</SplashWelcomeHeader>*/}
            </SplashVideo>
        </SplashContainer>
    )

}