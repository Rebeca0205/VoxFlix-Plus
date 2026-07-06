import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchMoviesByName = createAsyncThunk('movies/fetchMoviesForSearch', async (movieName) => {

    const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=ce08c34a8882594ec98348efc352064c&query=${encodeURIComponent(movieName)}&language=es-MX`
    );

    return movieResponse.data.results.slice(0, 10);
});

const searchByNameSlice = createSlice({
    name: "searchByName",
    initialState: {
        moviesResults: [],
        loading: false,
        error: null,
    },
    reducers: {
        resetResults: (state) =>{
            state.moviesResults = [];
            state.loading = false;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchMoviesByName.fulfilled, (state, action) => {

                state.loading = false;
                state.moviesResults = action.payload;
                state.error = null;
            })

            .addCase(fetchMoviesByName.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to fetch movies";
            })
    },
});

export const {resetResults} = searchByNameSlice.actions;
const {reducer: searchReducer} = searchByNameSlice;
export default searchReducer;