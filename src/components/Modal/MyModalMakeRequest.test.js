import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyModalMakeOffer from "./MyModalMakeOffer";
import { AddressContext } from "../../context/MyContext";
import { BrowserRouter as Router } from "react-router-dom";
import { async } from "q";
import { log } from "console";
describe("Test the MyModalMakeOffer component", () => {
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

    it("should render MyModalMakeOffer", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyModalMakeOffer data={{ open: true }} />
            </AddressContext.Provider>
        );
    });
    it("should render list btn", async () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyModalMakeOffer data={{ isModalOpen: true }} />
            </AddressContext.Provider>
        );
        const btnList = await screen.findAllByRole("button")
        expect(btnList).toHaveLength(3)

    });
    it("should render list offers", async () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyModalMakeOffer data={{ isModalOpen: true }} />
            </AddressContext.Provider>
        );
        const listOffer = screen.getByText("List offers:")
        expect(listOffer).toBeInTheDocument()
    });
    it("should render text payment", async () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyModalMakeOffer data={{ isModalOpen: true }} />
            </AddressContext.Provider>
        );
        const listOffer = screen.getByText(/Pay 1 time:/)
        expect(listOffer).toBeInTheDocument()
    });

});
