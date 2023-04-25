import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyChat from "./MyChat";
import { AddressContext } from "../../context/MyContext";

describe("Test the MyChat component", () => {
    test("should render MyChat", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyChat data={{ open: true }} />
            </AddressContext.Provider>
        );
    });
    test("should render conversation", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyChat data={{ open: true }} />
            </AddressContext.Provider>
        );
            const maintext = screen.getByTestId("conversation")
            expect(maintext).toBeInTheDocument();
    });
    test("should render msg input", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyChat data={{ open: true }} />
            </AddressContext.Provider>
        );
        const input = screen.getByPlaceholderText("Send message")
        expect(input).toBeInTheDocument();
    });
    test("should render msg btn", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyChat data={{ open: true }} />
            </AddressContext.Provider>
        );
        const button = screen.getAllByRole("button")
    });
});
