import { configureStore } from "@reduxjs/toolkit";
import carouselReducer from "./slices/carousel.slice";
import searchReducer from "./slices/search.slice";

const store = configureStore({
    reducer: {
        moviesCarousel: carouselReducer,
        moviesSearch: searchReducer,
    }
});

export default store;