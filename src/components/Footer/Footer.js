import React from 'react'
import {
    FooterContainer,
    FooterSubscription,
    FooterSubHeading,
    FooterSubText,
    Form,
    FormInput,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinksItems,
    FooterLinkTitle,
    FooterLink,
    SocialMedia,
    SocialMediaWrapper,
    WebsiteRights,
    SocialIcon,
    SocialIconLink,
    SocialLogo,
} from './Footer.elements'
import { Button } from '../../globalStyles'
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterSubscription>
                <FooterSubHeading>
                    Subheading text
                </FooterSubHeading>
                <FooterSubText>
                    Footer subtext
                </FooterSubText>
                <Form>
                    <FormInput name="email" type="email" placeholder="Your Email" />
                    <Button fontBig>Subscribe</Button>
                </Form>
            </FooterSubscription>
            <FooterLinksContainer>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle>About Us</FooterLinkTitle>
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/works'>Music</FooterLink>
                        <FooterLink to='/tools'>Programming</FooterLink>
                        <FooterLink to='/blog'>Solipsism and Lunacy</FooterLink>
                    </FooterLinksItems>
                    <FooterLinksItems>
                        <FooterLinkTitle>Music</FooterLinkTitle>
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/works'>Music</FooterLink>
                        <FooterLink to='/tools'>Programming</FooterLink>
                        <FooterLink to='/blog'>Solipsism and Lunacy</FooterLink>
                    </FooterLinksItems>
                </FooterLinksWrapper>
                <FooterLinksWrapper>
                    <FooterLinksItems>
                        <FooterLinkTitle>Programming</FooterLinkTitle>
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/works'>Music</FooterLink>
                        <FooterLink to='/tools'>Programming</FooterLink>
                        <FooterLink to='/blog'>Solipsism and Lunacy</FooterLink>
                    </FooterLinksItems>
                    <FooterLinksItems>
                        <FooterLinkTitle>Blog</FooterLinkTitle>
                        <FooterLink to='/sign-up'>How it works</FooterLink>
                        <FooterLink to='/works'>Music</FooterLink>
                        <FooterLink to='/tools'>Programming</FooterLink>
                        <FooterLink to='/blog'>Solipsism and Lunacy</FooterLink>
                    </FooterLinksItems>
                </FooterLinksWrapper>
            </FooterLinksContainer>
            <SocialMedia>
                <SocialMediaWrapper>
                    <SocialLogo to='/'>
                        <SocialIcon />
                        ULTRA
                    </SocialLogo>
                    <WebsiteRights>ULTRA 2020</WebsiteRights>
                    <SocialIcon>
                        <SocialIconLink href='/' target='_blank' aria-label='Facebook'>
                            <FaFacebook />
                        </SocialIconLink>
                        <SocialIconLink href='/' target='_blank' aria-label='Instagram'>
                            <FaInstagram />
                        </SocialIconLink>
                        <SocialIconLink href='/' target='_blank' aria-label='Youtube'>
                            <FaYoutube />
                        </SocialIconLink>
                    </SocialIcon>
                </SocialMediaWrapper>
            </SocialMedia>
        </FooterContainer>
    )
}

export default Footer
