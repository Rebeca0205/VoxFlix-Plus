import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, vi } from "vitest";
import Theme from "../theme";
import { Provider } from "react-redux";
import store from "../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import SearchResults from "../components/SearchResults";

vi.mock("../redux/slices/search.slice", () => ({
  default: (state = {}) => state,
  fetchMoviesByName: vi.fn(() => ({ type: "movies/fetchMoviesForSearch" })),
}));

const mockMovies = [
      {
        id: "1",
        title: "Supergirl",
        poster_path: "/imagen1.jpg",
      },
      {
        id: "2",
        title: "Superman",
        poster_path: "/imagen2.jpg",
      },
    ];

const mockStore = configureStore({
    reducer: {
        moviesSearch: () => ({
            moviesResults: mockMovies,
            loading: false,
            error: null,
        }),
    },
});

describe('SearchResults Component', () => {
    it('should render the results correctly', () => {
        render(
            <MemoryRouter>
                <Provider store={mockStore}>
                    <ThemeProvider theme={Theme}>
                        <SearchResults searchInput="Super"/>
                    </ThemeProvider>
                </Provider>
            </MemoryRouter>
        );

        expect(screen.getByText("Supergirl")).toBeInTheDocument();

        expect(screen.getByText("Superman")).toBeInTheDocument();
    });
})