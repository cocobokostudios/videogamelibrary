import * as React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import App from "../src/components/app";

let container: HTMLDivElement = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

it("renders a thing", () => {
    act(() => {
        render(<App />, container);
    });
    expect(container.textContent).toBe("Hello, World!");

    act(() => {
        render(<App name="DW" />, container);
    });
    expect(container.textContent).toBe("Hello, DW!");
});

it("does something else", ()=> {
    act(() => {
        render(<App />, container);    
    });
    expect(true).toBe(true);
});