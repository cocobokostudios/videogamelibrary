import { cleanup, render, waitFor, screen, within, getAllByRole, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";
import { initializeIcons } from "@fluentui/react";

import testCollection from "../data/test-collection.json";

import CollectionExplorer, { 
        COLLECTION_EXPLORER_COMMAND_BAR_TESTID,
        COLLECTION_EXPLORER_LOAD_COLLECTION_DIALOG_TESTID 
    } from "../../src/components/collection-explorer";

beforeEach(()=> {
    initializeIcons(undefined, { disableWarnings: true }); 
});
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

describe("Load Collection Dialogue", ()=> {
    it("displays a load collection dialog when load button is selected", async ()=> {
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

    it("enables the dialogue load button on a valid collection file loaded", async ()=> {
        // arrange file content
        const testFileContent = `
            gameId,title,platformId
            invalid-entry_snes,,snes
            ,,nes
            another_entry,title
            valid-game_snes,Valid Game,snes
        `.trim();
        const testFile = new File([testFileContent], "collection.csv", {type: "text/csv"});
        testFile.text = jest.fn(()=> Promise.resolve(testFileContent)); // mock text function, because it does not exist in JSDOM

        // arrange
        render(<CollectionExplorer />);
        const loadButton = await screen.findByText("Load");
        fireEvent.click(loadButton);
        waitFor(()=> screen.getByRole("dialog"));

        // act
        const fileInput : HTMLInputElement = await screen.getByTestId("loadCollectionInput") as HTMLInputElement;
        fireEvent.change(fileInput, {
            target: {
                files: [testFile]
            }
        });

        // assert
        expect(loadButton).toBeEnabled();
    });

    it("disables the dialogue load button when an invalid collection is loaded", async ()=> {
        // arrange file content
        const invalidFileContent = `
            gameId,title,platformId
            ,snes
            ,,nes
            another_entry,title
            valid-game_snes,Valid Game,snes
        `.trim();
        const testFile = new File([invalidFileContent], "collection.csv", {type: "text/csv"});
        testFile.text = jest.fn(()=> Promise.resolve(invalidFileContent)); // mock text function, because it does not exist in JSDOM

        // arrange
        render(<CollectionExplorer />);
        const loadButton = await screen.findByText("Load");
        fireEvent.click(loadButton);
        waitFor(()=> screen.getByRole("dialog"));

        // act
        const fileInput = await screen.getByTestId("loadCollectionInput");
        fireEvent.change(fileInput, {
            target: {
                files: [testFile]
            }
        });

        // assert
        expect(loadButton).not.toBeEnabled();
    });

    it.todo("closes the load dialogue when dialogue load button is selected");
    it.todo("closes the load dialogue when the dialogue cancel button is selected");
    it.todo("clears the loadedCollection when the dialogue dialogue is closed"); 
});
