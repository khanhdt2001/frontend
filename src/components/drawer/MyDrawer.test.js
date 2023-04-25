import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyDrawer from "./MyDrawer";
import { AddressContext } from "../../context/MyContext";

describe("Test the MyDrawer component", () => {
    it("should render MyDrawer", () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
    });
    it("should render my balance", () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
        const balance = screen.getByText("My balance")
        expect(balance).toBeInTheDocument();
    });
    it("should render my input balance", () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
        const balance = screen.getByPlaceholderText("Amount of eth want to withdraw")
        expect(balance).toBeInTheDocument();
    });

    it("should render my btn balance", async () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
        const btnList = await screen.findAllByRole("button")
       
        expect(btnList).toHaveLength(3)
    });
    it("should render main_msg", async () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
        const maintext = screen.getByTestId("conversation")
        expect(maintext).toBeInTheDocument();
    });
    it("should rendermsg input", async () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
        const input = screen.getByPlaceholderText("Send message")
        expect(input).toBeInTheDocument();
    });
});
