import { cleanup, render, waitFor, screen, within, getAllByRole, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";

import testCollection from "../data/test-collection.json";

import CollectionExplorer, { 
        COLLECTION_EXPLORER_COMMAND_BAR_TESTID,
        COLLECTION_EXPLORER_LOAD_COLLECTION_DIALOG_TESTID 
    } from "../../src/components/collection-explorer";

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

it("displays a load collection dialog when load button", async ()=> {
    // arrange
    render(<CollectionExplorer />);

    // act
    const loadButton = await screen.findByText("Load");
    fireEvent.click(loadButton);
    const loadDialog = await screen.getByRole("dialog");

    // assert
    // NOTE: toBeVisible checks the wrapper element which is technically invisible
    expect(loadDialog).toBeTruthy();
});

it.todo("handles the change event for the load collection file input");