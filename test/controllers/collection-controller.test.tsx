import CollectionController from "../../src/controllers/collection-controller";
import Game from "../../src/models/game";

import testCollection from "../data/test-collection.json";

it("returns a singleton instance", ()=> {
    // arrange & act
    const target = CollectionController.getInstance();
    const otherTarget = CollectionController.getInstance();

    // assert
    expect(Object.is(target, otherTarget)).toBe(true);
});

it("initializes with an empty collection", ()=> {
    // arrange & act
    const target = CollectionController.getInstance();

    // act
    expect(target.collection).toBeTruthy();
    expect(target.collection.length).toEqual(0);
});

it("loads all valid games from JSON into the in-memory collection", ()=> {
    // arrange
    const target = CollectionController.getInstance();

    // act
    const result = target.loadCollectionFromJSON(testCollection);

    // assert
    expect(result).toEqual(0);
    expect(target.collection.length).toEqual(testCollection.length);
});

it.todo("returns number of invalid");
it.todo("saves a game collection from memory into local storage");