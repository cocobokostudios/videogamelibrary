import { act, cleanup, render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";

import App from "../src/components/app";
import { APP_TITLE_TESTID } from "../src/components/app-title";

// setup & teardown
afterEach(cleanup);

it("displays the title in the header", async ()=> {
    // arrange
    render(<App />);

    // act
    await waitFor(() => screen.getAllByRole("heading"));

    // assert
    let appHeader = screen.getByTestId("app_header");
    expect(within(appHeader).getAllByTestId(APP_TITLE_TESTID).length).toEqual(1);
});

