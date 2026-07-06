import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { genres } from "./genresList";

export const fetchMoviesCarousel = createAsyncThunk('movies/fetchMoviesForCarousel', async (genreName) => {
    const genre = genres.find(item => item.name === genreName);
    const genreId = genre ? genre.id : null;

    const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=ce08c34a8882594ec98348efc352064c&include_adult=false&include_video=false&language=es-MX&page=1&sort_by=popularity.desc&with_genres=${genreId}`
    );

    return {
      genreName,
      movies: movieResponse.data.results.slice(0, 10),
    };
});

const carouselSlice = createSlice({
    name: "carousel",
    initialState: {
        moviesByGenre: {},
        loadingByGenre: {},
        errorByGenre: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesCarousel.pending, (state, action) => {
                const genreNameCase = action.meta.arg;
                state.loadingByGenre[genreNameCase] = true;
                state.errorByGenre[genreNameCase] = null;
            })

            .addCase(fetchMoviesCarousel.fulfilled, (state, action) => {
                const genreNameCase = action.meta.arg;
                const { genreName, movies } = action.payload;

                state.loadingByGenre[genreName] = false;
                state.moviesByGenre[genreName] = movies;
                state.errorByGenre[genreNameCase] = null;
            })

            .addCase(fetchMoviesCarousel.rejected, (state, action) => {
                const genreNameCase = action.meta.arg;

                state.loadingByGenre[genreNameCase] = false;
                state.errorByGenre[genreNameCase] = "Failed to fetch movies";
            })
    },
});

// const {reducer: carouselReducer} = carouselSlice;
// export default carouselReducer;
export default carouselSlice.reducer;