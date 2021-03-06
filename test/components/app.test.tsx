import { act, cleanup, render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";
import { initializeIcons } from "@fluentui/react";

import App from "../../src/components/app";
import { APP_TITLE_TESTID } from "../../src/components/app-title";
import { APP_LOGO_TESTID } from "../../src/components/app-logo";

// setup & teardown
beforeEach(()=> {
    initializeIcons(undefined, { disableWarnings: true }); 
});
afterEach(cleanup);

it("displays the title and logo in the header", async ()=> {
    // arrange
    render(<App />);

    // act
    await waitFor(() => screen.getAllByRole("heading"));

    // assert
    let appHeader = screen.getByTestId("app_header");
    
    expect(within(appHeader).getAllByTestId(APP_TITLE_TESTID).length).toEqual(1);
    expect(within(appHeader).getAllByTestId(APP_LOGO_TESTID).length).toEqual(1);
});


