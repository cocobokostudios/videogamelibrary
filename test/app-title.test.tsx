import { act, cleanup, render, waitFor, screen, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as React from "react";

import AppTitle, { APP_TITLE_TESTID } from "../src/components/app-title";
import { APP_VERSION_TESTID } from "../src/components/app-version";

afterEach(cleanup);

it("displays the title provided", async ()=> {
    // arrange
    const expectedTitle = "Hello Title!";
    render(<AppTitle title={expectedTitle} />);

    // act
    await waitFor(() => screen.getByRole("heading"));

    // assert
    expect(screen.getByRole("heading")).toHaveTextContent(expectedTitle);
});

it("displays a default title if none is provided", async ()=> {
    // arrange
    render(<AppTitle />);

    // act
    let testTarget;
    await waitFor(() => {
        testTarget = screen.getByTestId(APP_TITLE_TESTID);
    });

    // assert
    expect(testTarget).toHaveTextContent("Video Game Library");
});

it("renders the <AppVersion />", async ()=> {
    // arrange
    render(<AppTitle />);

    // act
    let testTarget;
    await waitFor(() => {
        testTarget = screen.getByTestId(APP_TITLE_TESTID);
    });

    // assert
    expect(within(testTarget).getAllByTestId(APP_VERSION_TESTID).length).toEqual(1);
});