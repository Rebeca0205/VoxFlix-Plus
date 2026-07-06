import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchMoviesByName } from "../../redux/slices/search.slice";
import Movie from "../Movie";
import { SearchGrid } from "./styles";

const SearchResults = ({searchInput}) => {
    const moviesList = useSelector(
        state => state.moviesSearch.moviesResults
    );

    const isLoading = useSelector(
        state => state.moviesSearch.loading
    );

    const error = useSelector(
        state => state.moviesSearch.error
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchMoviesByName(searchInput));
    }, [dispatch, searchInput]);


    return(
        <SearchGrid>
            {isLoading && (
                    <p style={{ color: 'white', textAlign: 'center'}}>Cargando películas...</p>
                )}

                {error && (
                    <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
                )}

                {!isLoading && !error && !moviesList.length && (
                    <p style={{ color: 'aqua', textAlign: 'center'}}>No se encontraron peliculas.</p>
                )}

                {!isLoading && !error && moviesList.map((movie) => {
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
        </SearchGrid>
    )
}

export default SearchResults