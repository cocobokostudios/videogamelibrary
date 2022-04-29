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
    jest.spyOn(console, "warn").mockImplementation(jest.fn(()=> {}));
    jest.spyOn(console, "error").mockImplementation(jest.fn(()=> {}));

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
    it("displays a collection load file input when load button is selected", async ()=> {
        // arrange
        render(<CollectionExplorer />);
        const loadButton = await screen.findByText("Load");
        fireEvent.click(loadButton);
        await waitFor(()=> screen.getByRole("dialog"));
    
        // act
        const fileInput = screen.getByTestId("loadCollectionInput");
    
        // assert
        expect(fileInput).toBeInTheDocument();
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
        const fileInput : HTMLInputElement = screen.getByTestId("loadCollectionInput") as HTMLInputElement;
        fireEvent.change(fileInput, {
            target: {
                files: [testFile]
            }
        });

        // assert
        expect(loadButton).toBeEnabled();
    });

    it("closes the load dialogue when dialogue load button is clicked", async ()=> {
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
        await waitFor(()=> screen.getByRole("dialog"));

        // act
        const fileInput : HTMLInputElement = await screen.getByTestId("loadCollectionInput") as HTMLInputElement;
        fireEvent.change(fileInput, {
            target: {
                files: [testFile]
            }
        });
        fireEvent.click(loadButton);

        // assert
        expect(screen.getByRole("dialog")).not.toBeVisible();
    });

    it("closes the load dialogue when the dialogue cancel button is selected", async ()=> {
        // arrange dialogue
        render(<CollectionExplorer />);
        const loadButton = await screen.findByText("Load");
        fireEvent.click(loadButton);
        waitFor(()=> screen.getByRole("dialog"));

        // act
        const cancelButton = await screen.findByText("Cancel");
        fireEvent.click(cancelButton);

        // assert
        expect(screen.getByRole("dialog")).not.toBeVisible();
    });
});
