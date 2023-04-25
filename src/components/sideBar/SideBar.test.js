import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddressContext } from "../../context/MyContext";
import { BrowserRouter as Router } from "react-router-dom";
import { async } from "q";
import { log } from "console";
import SideBar from "./SideBar";
describe("Test the Sidebar component", () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: jest.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(), // Deprecated
                removeListener: jest.fn(), // Deprecated
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    });

    it("should render SideBar", () => {
        render(
            <Router>
                <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                    <SideBar data={{ open: true }} />
                </AddressContext.Provider>
            </Router>
        );
    });
});
