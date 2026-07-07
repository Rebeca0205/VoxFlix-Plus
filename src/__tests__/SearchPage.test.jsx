import { render, screen } from "@testing-library/react";
import React, { useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, vi } from "vitest";
import Theme from "../theme";
import { Provider } from "react-redux";
import store from "../redux/store";
import { configureStore } from "@reduxjs/toolkit";
import SearchResults from "../components/SearchResults";
import SearchBar from "../components/SearchBar";
import userEvent from "@testing-library/user-event";
import SearchPage from "../components/SearchPage";

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

const movieResultsReducer = (state = {
        moviesResults: [],
        loading: false,
        error: null,
}, action) => {
    if(action.type === "movies/fetchMoviesForSearch"){
        return{
            ...state,
            moviesResults: mockMovies,
        }
    }
    
    return state
}

const mockStore = configureStore({
    reducer: {
        moviesSearch: movieResultsReducer,
    },
});

const SearchPageMock = () => {
    const [inputValue, setInputValue] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    return(
        <Provider store={mockStore}>
            <ThemeProvider theme={Theme}>
                <MemoryRouter>
                    <SearchBar
                        searchName={inputValue}
                        setSearchName={setInputValue}
                        onSearch={() => setSearchTerm(inputValue)}
                    />
                    <SearchResults
                        searchInput={searchTerm}
                    />
                </MemoryRouter>
            </ThemeProvider>
        </Provider>     
    )
}

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('SearchPage Component', () => {
    it('should render all the components correctly', async () => {
        render(
            <Provider store={mockStore}>
            <ThemeProvider theme={Theme}>
                <MemoryRouter>
                    <SearchBar
                        searchName=''
                        setSearchName={vi.fn()}
                        onSearch={vi.fn()}
                    />
                    <SearchResults
                        searchInput=""
                    />
                </MemoryRouter>
            </ThemeProvider>
        </Provider>   
        );

        const titleElement = screen.getByText(/¡Busca tu Pelicula!/i);
        expect(titleElement).toBeInTheDocument();

        const PlaceholderElement = screen.getByPlaceholderText("Escribe lo que sea");
        expect(PlaceholderElement).toBeInTheDocument();

        // const PrimerMensajeDeResultados = await screen.findByText("No se encontraron peliculas.");
        // expect(PrimerMensajeDeResultados).toBeInTheDocument();
    });

    it('should look for songs writing it on the input and the results must be displayed', async () => {
        const user = userEvent.setup();

        render(<SearchPageMock/>);

        const input = screen.getByRole("textbox");
        await user.type(input, "Super");
        const button = screen.getByRole("button", {name: /Buscar/i});
        await user.click(button);

        expect(screen.getByText("Supergirl")).toBeInTheDocument();
        expect(screen.getByText("Superman")).toBeInTheDocument();

    });

    it('should return to the main page after clicking on the arrow', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter>
                <Provider store={mockStore}>
                    <ThemeProvider theme={Theme}>
                        <SearchPage/>
                    </ThemeProvider>
                </Provider>
            </MemoryRouter>
        );

        const arrow = screen.getByAltText("BackArrowIMG");
        await user.click(arrow);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    })
})