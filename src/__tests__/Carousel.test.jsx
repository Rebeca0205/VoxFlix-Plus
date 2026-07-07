import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, vi } from "vitest";
import Theme from "../theme";
import { Provider } from "react-redux";
import store from "../redux/store";
import Carousel from "../components/Carousel";
import { configureStore } from "@reduxjs/toolkit";

vi.mock("../redux/slices/carousel.slice", () => ({
  default: (state = {}) => state,
  fetchMoviesCarousel: vi.fn((genre) => ({
    type: "moviesCarousel/fetchMoviesCarousel",
    payload: genre,
  })),
}));

vi.mock("../components/Movie", () => ({
  default: ({ movieTitle }) => <div>{movieTitle}</div>,
}));

const renderCarousel = (preloadedState, genre = "Abenteuer") => {
  const store = configureStore({
    reducer: {
      moviesCarousel: (state = preloadedState.moviesCarousel) => state,
    },
    preloadedState,
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ThemeProvider theme={Theme}>
          <Carousel genre={genre} />
        </ThemeProvider>
      </MemoryRouter>
    </Provider>
  );

  return store;
};

describe("Carousel component", () => {
    it("should show loading message", () => {
    renderCarousel({
      moviesCarousel: {
        moviesByGenre: { Abenteuer: [] },
        loadingByGenre: { Abenteuer: true },
        errorByGenre: { Abenteuer: null },
      },
    },
    "Abenteuer"
);

    expect(screen.getByText(/Cargando peliculas/i)).toBeInTheDocument();
  });

  it("should show error message", () => {
    renderCarousel({
      moviesCarousel: {
        moviesByGenre: { Abenteuer: [] },
        loadingByGenre: { Abenteuer: false },
        errorByGenre: { Abenteuer: "Failed to fetch movies"},
      },
    },
    "Abenteuer"
);

    expect(screen.getByText(/Failed to fetch movies/i)).toBeInTheDocument();
  });

  it("should show empty message when there are no movies", () => {
    renderCarousel({
        moviesCarousel: {
            moviesByGenre: { Abenteuer: [] },
            loadingByGenre: { Abenteuer: false },
            errorByGenre: { Abenteuer: null },
        },
        },
        "Abenteuer"
    );

    expect(screen.getByText(/No se encontraron peliculas/i)).toBeInTheDocument();
  });

  it("should render movies", () => {
    renderCarousel({
      moviesCarousel: {
        moviesByGenre: {
          Abenteuer: [
            { id: 1, title: "Movie One", poster_path: "/movie1.jpg" },
            { id: 2, title: "Movie Two", poster_path: "/movie2.jpg" },
          ],
        },
        loadingByGenre: { Abenteuer: false },
        errorByGenre: { Abenteuer: null },
      },
    },
    "Abenteuer"
);

    expect(screen.getByText("Movie One")).toBeInTheDocument();
    expect(screen.getByText("Movie Two")).toBeInTheDocument();
  });
})