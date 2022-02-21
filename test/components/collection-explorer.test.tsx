import { cleanup, render, waitFor, screen, within, getAllByRole } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";

import CollectionExplorer, { COLLECTION_EXPLORER_COMMAND_BAR_TESTID } from "../../src/components/collection-explorer";

afterEach(cleanup);

it("has the command bar in the header", async ()=> {
    // arrange
    render(<CollectionExplorer />);

    // act
    await waitFor(()=> screen.getAllByRole("banner"));

    // assert
    const commmandBarElement = screen.getByTestId(COLLECTION_EXPLORER_COMMAND_BAR_TESTID);
    expect(commmandBarElement).toBeTruthy();
});