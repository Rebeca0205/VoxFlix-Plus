import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { MovieIMG, MovieSection, TextDiv } from "./styles";

const MovieDetails = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getMovie = async () => {
            try {
                setLoading(true);

                const movieResponse = await axios.get(
                    `https://api.themoviedb.org/3/movie/${id}?api_key=ce08c34a8882594ec98348efc352064c&language=es-MX`
                );

                setMovie(movieResponse.data);

                setLoading(false);

            } catch (error) {
                setError("Failed to get movie details")
                setLoading(false);
            }
        };

        getMovie();
    }, [id])

    return(
        <>
        {loading && (
            <p style={{ color: 'white' }}>Cargando pelicula...</p>
        )}

        {error && (
            <p style={{ color: 'red' }}>{error}</p>
        )}

        {!loading && !error && !movie && (
            <p style={{ color: 'aqua' }}>No se encontro la pelicula</p>
        )}

        {!loading && !error && movie && (
            <MovieSection>
                <MovieIMG src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}/>
                <TextDiv>
                    <h1 style={{fontSize: 'clamp(2rem, 2vw, 3.5rem)'}}>{movie.title}</h1>
                    <p>{movie.tagline}</p>
                    <p>{movie.overview}</p>
                    <button style={{fontSize: 'clamp(1rem, 2vw, 1.4rem)'}} onClick={() => navigate("/")}>
                        Volver al Menu
                    </button>
                </TextDiv>
            </MovieSection>
        )}
        
        </>
    )
}

export default MovieDetails;