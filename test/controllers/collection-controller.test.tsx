import { mockComponent } from "react-dom/test-utils";
import CollectionController from "../../src/controllers/collection-controller";
import Game from "../../src/models/game";

import validCollectionData from "../data/test-collection.json";
import invalidCollectionData from "../data/test-invalid-collection.json";

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

it("loads JSON data from file", async ()=> {
    // arrange
    const testFile = new File([JSON.stringify(validCollectionData)], "collection.json");
    const target = CollectionController.getInstance();
    target.loadCollectionFromJSON = jest.fn(x => 0);    // mock dependency

    // act
    const result = await target.loadCollectionFromFile(testFile);

    // assert
    expect(result).toEqual(0);
    expect(target.collection).toStrictEqual(validCollectionData);
    expect(target.loadCollectionFromJSON).toBeCalled();
});

it("loads JSON objects into collection", ()=> {
    // arrange
    const target = CollectionController.getInstance();
    target.loadCollection = jest.fn(x => 0);    // mock dependent function
    const testData = JSON.stringify(validCollectionData);

    // act
    const result = target.loadCollectionFromJSON(testData);

    // assert
    expect(result).toBe(0);
    expect(target.loadCollection).toBeCalledTimes(1);
});

it("loads all valid games into the in-memory collection", ()=> {
    // arrange
    const target = CollectionController.getInstance();

    // act
    const result = target.loadCollection(validCollectionData);

    // assert
    expect(result).toEqual(0);
    expect(target.collection.length).toEqual(validCollectionData.length);
});

it("saves a game collection from memory into local storage", ()=> {
    // arrange
    const target = CollectionController.getInstance();
    const expectedKey = `${CollectionController.STORAGE_PREFIX}_collection`;
    target.loadCollection(validCollectionData);

    // act
    target.saveCollection();

    // assert
    const result = localStorage.getItem(expectedKey); 
    expect(result).not.toBeNull();
    expect(JSON.parse(result)).toStrictEqual(target.collection);
});