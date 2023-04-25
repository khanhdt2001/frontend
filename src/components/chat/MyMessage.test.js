import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyMessage from "./MyMessage";
import { AddressContext } from "../../context/MyContext";
import {myShortString} from "../../function/Function"

describe("Test the MyMessage component", () => {
    test("should render MyMessage", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyMessage message={{ name: "khanhdt", text: "hello world" }} />
            </AddressContext.Provider>
        );
    });
    test("should render sender name", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyMessage
                    message={{ name: "khanhdt_nameaaa", text: "hello world" }}
                />
            </AddressContext.Provider>
        );
        const senderName = screen.getByText(myShortString("khanhdt_nameaaa", 10));
        expect(senderName).toBeInTheDocument;
    });
    test("should render sender msg", () => {
        render(
            <AddressContext.Provider value={{ currentAddress: "khanhdt" }}>
                <MyMessage message={{ name: "khanhdt", text: "hello world" }} />
            </AddressContext.Provider>
        );
        const senderMsg = screen.getByText("hello world");
        expect(senderMsg).toBeInTheDocument;
    });
});
