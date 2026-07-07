import { render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import Theme from "../theme";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import MovieDetails from '../components/MovieDetails';
import axios from "axios";
import userEvent from "@testing-library/user-event";

vi.mock("axios");

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('MovieDetails Component', () => {
    it("should render the details of the movie correctly", async () => {
        axios.get.mockResolvedValueOnce({
        data: {
            id: 1,
            title: "Supergirl",
            tagline: "La aventura comienza",
            overview: "Esta es la descripción de la película.",
            poster_path: "/supergirl.jpg",
        },
        });

        render(
            <MemoryRouter initialEntries={["/movie/1"]}>           
                <Routes>
                    <Route path="/movie/:id" element={<MovieDetails/>}/>
                </Routes>        
            </MemoryRouter>
        );

        expect(await screen.findByText(/Supergirl/i)).toBeInTheDocument();
        expect(screen.getByText(/La aventura comienza/i)).toBeInTheDocument();
        expect(screen.getByText(/Esta es la descripción/i)).toBeInTheDocument();
    })

    it("should call the function to return to the main page after clicking on Volver al menu", async () => {
        const user =  userEvent.setup();

        axios.get.mockResolvedValueOnce({
        data: {
            id: 1,
            title: "Supergirl",
            tagline: "La aventura comienza",
            overview: "Esta es la descripción de la película.",
            poster_path: "/supergirl.jpg",
        },
        });

        render(
            <MemoryRouter initialEntries={["/movie/1"]}>           
                <Routes>
                    <Route path="/movie/:id" element={<MovieDetails/>}/>
                </Routes>        
            </MemoryRouter>
        );

        const button = await screen.findByRole("button", {name: /Volver al Menu/i});
        await user.click(button);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    })
});