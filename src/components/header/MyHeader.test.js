import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";
import { AddressContext } from "../../context/MyContext";
import { BrowserRouter as Router } from "react-router-dom";
describe("Test the Header component", () => {
    beforeAll(() => {
        Object.defineProperty(window, "matchMedia", {
          writable: true,
          value: jest.fn().mockImplementation(query => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
          }))
        });
      });
    it("should render header component", () => {
        render(
            <Router>
                <AddressContext.Provider
                    value={{
                        currentAddress:
                            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                    }}
                >
                    <Header />
                </AddressContext.Provider>
            </Router>
        );
    });
    it("should render user address", () => {
        render(
            <Router>
                <AddressContext.Provider
                    value={{
                        currentAddress:
                            "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                    }}
                >
                    <Header />
                </AddressContext.Provider>
            </Router>
        );
       const userAddress = screen.getByText("0x7...79C8")
       expect(userAddress).toBeInTheDocument()
    });
    it("should render Connnect wallet text", () => {
        render(
            <Router>
                <AddressContext.Provider
                    value={{
                        currentAddress:
                            "",
                    }}
                >
                    <Header />
                </AddressContext.Provider>
            </Router>
        );
       const connectWallet = screen.getByText("Connnect wallet")
       expect(connectWallet).toBeInTheDocument()
    });
    it("should render logo", () => {
        render(
            <Router>
                <AddressContext.Provider
                    value={{
                        currentAddress:
                            "",
                    }}
                >
                    <Header />
                </AddressContext.Provider>
            </Router>
        );
       const logo = screen.getByText("Ezio")
       expect(logo).toBeInTheDocument()
    });
});
