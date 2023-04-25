import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyModalMakeOffer from "./MyModalMakeOffer";
import { AddressContext } from "../../context/MyContext";
import { BrowserRouter as Router } from "react-router-dom";
import { async } from "q";
import { log } from "console";
describe("Test the MyModalMakeOffer component", () => {
    const mockData = {
        isModalOpen: true,
        handleCancel: () => {},
        currentDataLocal:  {
            "_id": "643aa8bc0d3f01399277570e",
            "receiptNumber": 4,
            "vendor": "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
            "lendor": "0x0000000000000000000000000000000000000000",
            "NFTAddress": "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
            "tokenId": "2",
            "tokenAmount": 0,
            "paidAmount": 0,
            "tokenRate": 0,
            "amountOfTime": 0,
            "deadLine": 0,
            "paymentTime": 0,
            "paymentCount": 0,
            "out": false,
            "__v": 0
          },
        SetIsLoading: false,
        currentDataWeb: {
            rawMetadata: {
                image: "",
            },
        },
    };
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

    it("should render MyModalMakeOffer component", () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyModalMakeOffer
                    data={mockData}
                />
            </AddressContext.Provider>
        );
    });
    it("should render 3 button",async () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyModalMakeOffer
                    data={mockData}
                />
            </AddressContext.Provider>
        );
        const btnList = await screen.findAllByRole("button")
        expect(btnList).toHaveLength(3)
    });
    it("should render 1 image",async () => {
        render(
            <AddressContext.Provider
                value={{
                    currentAddress:
                        "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
                }}
            >
                <MyModalMakeOffer
                    data={mockData}
                />
            </AddressContext.Provider>
        );
        const imgList = await screen.findAllByRole("img")
        expect(imgList).toHaveLength(7)
    });
    
});
