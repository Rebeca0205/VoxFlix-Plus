import { render, screen, waitFor } from "@testing-library/react";
import React, { useState } from "react";
import { MemoryRouter} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import Theme from "../theme";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userEvent from "@testing-library/user-event";
import store from "../redux/store";
import SearchBar from "../components/SearchBar";

function Wrapper() {
    const [inputValue, setInputValue] = useState("");

    return (
        <Provider store={store}>
            <ThemeProvider theme={Theme}>
                <SearchBar
                    searchName={inputValue}
                    setSearchName={setInputValue}
                    onSearch={vi.fn()}
                />
            </ThemeProvider>
        </Provider>
    );
}

describe('SearchBar Component', () => {
    it("should rende the searcg bar correctly", () => {
        render(
            <Provider store={store}>
                <ThemeProvider theme={Theme}>
                    <SearchBar
                        searchName=""
                        setSearchName={vi.fn()}
                        onSearch={vi.fn()}
                     />
                </ThemeProvider>
            </Provider>
        )
        
        const PlaceholderElement = screen.getByPlaceholderText("Escribe lo que sea");
        expect(PlaceholderElement).toBeInTheDocument();

        const Button = screen.getByText("Buscar");
        expect(Button).toBeInTheDocument();
    });

    it("should let the user write on the input and the value changes", async () => {
        const user = userEvent.setup();

        render(<Wrapper/>);

        const input = screen.getByRole("textbox");

        await user.type(input, "SuperGirl");

        expect(input).toHaveValue("SuperGirl");
    });

    it("should call the function onSearch when clicking on Buscar", async () => {
        const user = userEvent.setup();
        const onSearch = vi.fn();

        render(
            <Provider store={store}>
                <ThemeProvider theme={Theme}>
                    <SearchBar
                        searchName="Supergirl"
                        setSearchName={vi.fn()}
                        onSearch={onSearch}
                     />
                </ThemeProvider>
            </Provider>
        );

        const button = screen.getByRole("button", {name: /buscar/i});
        await user.click(button);
        expect(onSearch).toHaveBeenCalledTimes(1);

        const input = screen.getByRole("textbox");
        await user.click(input);
        await user.keyboard("{Enter}");
        expect(onSearch).toHaveBeenCalledTimes(2);
    });

    it("should clean the input after clicking the refresh button", async () => {
        const user = userEvent.setup();

        render(
            <Wrapper/>
        );

        const input = screen.getByRole("textbox");

        await user.type(input, "Supergirl");

        const refreshButton = screen.getByAltText('RefreshIcon');
        await user.click(refreshButton);

        expect(input).toHaveValue("");
    });


})