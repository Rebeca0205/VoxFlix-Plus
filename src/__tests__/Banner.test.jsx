import { render, screen } from "@testing-library/react";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { describe, it, vi } from "vitest";
import Theme from "../theme";
import BannerSearch from "../components/BannerSearch";
import { Provider } from "react-redux";
import store from "../redux/store";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Banner Component", () => {
    it("should render the Banner correctly", () => {
        render(
            <MemoryRouter>
                <Provider store={store}>
                    <ThemeProvider theme={Theme}>
                        <BannerSearch/>
                    </ThemeProvider>
                </Provider>            
            </MemoryRouter>
        )

        const Bannerelement = screen.getByText(/BIENVENIDO A VOXFLIX/i);

        expect(Bannerelement).toBeInTheDocument();
    });

    it("should navigate to the search page after clicking a button", async () => {
        const user =  userEvent.setup();

        render(
            <MemoryRouter>
                <Provider store={store}>
                    <ThemeProvider theme={Theme}>
                        <BannerSearch/>
                    </ThemeProvider>
                </Provider>            
            </MemoryRouter>
        );

        const button = screen.getByRole("button", {name: /¿No encontraste lo/i});
        await user.click(button);
        expect(mockNavigate).toHaveBeenCalledWith("/searchMovie");
    })
})