import React, { useRef } from "react"
import searchIcon from '../../assets/search.svg'
import Carousel from '../Carousel';
import { Banner, SearchBackground, SearchIconIMG, SearchSection, SearchTitle, BannerButton, SeeMoviesButton} from './styles';
import { useNavigate } from "react-router-dom";

const BannerSearch = () => {
    const navigate = useNavigate();
    const carouselWithMovies = useRef(null);

    return(
        <>
            <Banner>
                <SearchBackground>
                    <SearchTitle>BIENVENIDO A VOXFLIX! TU SERVICIO DE STREAMING FAVORITO! 
                        CONFIENOS SU ENTRETENIMIENTO!
                    </SearchTitle>
                    <SearchSection>
                        <SeeMoviesButton onClick={() => carouselWithMovies.current.scrollIntoView({ behavior: "smooth" })}>
                            VER PELICULAS
                        </SeeMoviesButton>
                        
                        <BannerButton onClick={() => navigate("/searchMovie")}>¿No encontraste lo que buscabas? Pues buscalo aquí!</BannerButton>
                    </SearchSection>
                </SearchBackground>
            </Banner>
            <section ref={carouselWithMovies}>
                <Carousel genre="Abenteuer"/>
                <Carousel genre="Horror"/>
                <Carousel genre="Drama"/>
            </section>
        </>
    )
}

export default BannerSearch;