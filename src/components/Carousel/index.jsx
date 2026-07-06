import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoviesCarousel } from "../../redux/slices/carousel.slice";
import { carouselTitles } from "./carouselTitles";
import Movie from "../Movie";
import { CarouselFila, CarouselSection } from "./styles";

const emptyMovies = [];

const Carousel = ({genre}) => {
    const movies = useSelector(
        state => state.moviesCarousel.moviesByGenre[genre] ?? emptyMovies
    );

    const isLoading = useSelector(
        state => state.moviesCarousel.loadingByGenre[genre] ?? false
    );

    const error = useSelector(
        state => state.moviesCarousel.errorByGenre[genre] ?? null
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMoviesCarousel(genre));
    }, [dispatch, genre]);

    const genreInList = carouselTitles.find(item => item.name === genre);
    const title = genre ? genreInList.title : "";

    return(
        <CarouselSection>
            <h2>{title}</h2>
            <CarouselFila>
                {isLoading && (
                    <p style={{ color: 'white' }}>Cargando peliculas...</p>
                )}

                {error && (
                    <p style={{ color: 'red' }}>{error}</p>
                )}

                {!isLoading && !error && !movies.length && (
                    <p style={{ color: 'aqua' }}>No se encontraron peliculas.</p>
                )}

                {!isLoading && !error && movies.map((movie) => {
                    const { id, poster_path, title } = movie;

                    return (
                    <Movie
                        key={id}
                        id={id}
                        movieTitle={title}
                        movieIMG={poster_path}
                    />
                    );
                })}
            </CarouselFila>
        </CarouselSection>
    )
}

export default Carousel;