import { render, screen } from "@testing-library/react";
import React from "react";
import Header from "../components/Header";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "../theme";

describe("Header Component", () => {
    it("should rener the header correctly", () => {
        render(
            <MemoryRouter>
                <ThemeProvider theme={Theme}>
                    <Header/>
                </ThemeProvider>
            </MemoryRouter>
        );

        const HeaderElement = screen.getByText("VOXFLIX");
        expect(HeaderElement).toBeInTheDocument();
    })
})