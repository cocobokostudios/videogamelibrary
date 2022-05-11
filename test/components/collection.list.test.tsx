import { cleanup, render, waitFor, screen, within, getAllByRole, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import * as React from "react";
import { initializeIcons } from "@fluentui/react";

import CollectionList from "../../src/components/collection-list";
import Game from "../../src/models/game";

it("shows the platform, title, region, and price by default", ()=> {
    // arrange
    const testCollectionItems : Array<Game> = [
        new Game("uncharted-waters_snes", "Uncharted Waters", "snes", "jp", 1.99)
    ];

    // act
    render(<CollectionList 
        title="MyTestCollection"
        items={testCollectionItems} 
        />);

    // assert
    expect(screen.getByText(/platform/i)).not.toBeNull();
    expect(screen.getByText(/title/i)).not.toBeNull();
    expect(screen.getByText(/region/i)).not.toBeNull();
    expect(screen.getByText(/price/i)).not.toBeNull();
});