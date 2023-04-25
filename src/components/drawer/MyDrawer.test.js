import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import MyDrawer from "./MyDrawer";
import { AddressContext } from "../../context/MyContext";

describe("Test the MyDrawer component", () => {

    it("should render MyDrawer", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "0x70997970C51812dc3A010C7d01b50e0d17dc79C8" }}>
                <MyDrawer data={{ open: true }} />
            </AddressContext.Provider>
        );
    });
});
