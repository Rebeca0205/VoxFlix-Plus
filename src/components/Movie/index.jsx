import { Link } from "react-router-dom";
import { MovieOption, PosterIMG } from "./styles";

const Movie = ({id, movieIMG, movieTitle}) => {
    return(
        <MovieOption>
            <Link to={`/movie/${id}`}>
                <PosterIMG src={`https://image.tmdb.org/t/p/original${movieIMG}`} alt={movieTitle}/>
                <h3 style={{textAlign: "center"}}>{movieTitle}</h3>
            </Link>
        </MovieOption>
    )
}

export default Movie;