import styled from "styled-components";
import VoxBanner from '../../assets/VoxBanner.png'

const Banner = styled.section`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 30px 0;
    width: 100%;
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0), transparent), url(${VoxBanner});
    background-repeat: no-repeat;
    background-size: 110%;
    background-color: rgba(120, 120, 120, 0);
    background-blend-mode: multiply;
    background-position-y: 25%;
    background-position-x: 78%;

    @media screen and (max-width: 50em) {
        padding: 20px 0;
    }

    @media screen and (max-width: 450px) {
        padding: 20px 0;
        background-position-y: 50%;
    }
`

const SearchBackground = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 40%;
    background-color: rgba(0, 255, 255, 0.7);
    border: 5px solid rgba(112, 255, 255, 1);
    margin-right: 40px;
    padding: 50px 20px;

    @media screen and (max-width: 50em) {
        padding: 30px 20px;
    }

    @media screen and (max-width: 450px) {
        margin-right: 10px;
        padding: 10px 20px;
    }
`

const SearchSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
`

const SearchIconIMG = styled.img`
    cursor: pointer;
`

const SearchTitle = styled.h2`
    box-sizing: border-box;
    font-size: clamp(0.9rem, 3vw, 2.4rem);
    text-align: center;
    color: ${props => props.theme.colors.white};
`

const SeeMoviesButton = styled.button`
    @media screen and (max-width: 450px) {
        padding: 10px;
    }
`

const BannerButton = styled.button`
    border-radius: 50px;
    padding: 10px;
    outline: none; 
    font-size: clamp(0.8rem, 2vw, 1.3rem);
    font-weight: 500;
    width: 80%;
`

export {
    Banner,
    SearchBackground,
    SearchSection,
    SearchIconIMG,
    SearchTitle,
    BannerButton,
    SeeMoviesButton
}