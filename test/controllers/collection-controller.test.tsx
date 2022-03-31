import { mockComponent } from "react-dom/test-utils";
import CollectionController from "../../src/controllers/collection-controller";
import Game from "../../src/models/game";

import validCollectionData from "../data/test-collection.json";
import invalidCollectionData from "../data/test-invalid-collection.json";

beforeEach(()=> {
    CollectionController.resetInstance();
});

it("returns a singleton instance", ()=> {
    // arrange & act
    const target = CollectionController.getInstance();
    const otherTarget = CollectionController.getInstance();

    // assert
    expect(Object.is(target, otherTarget)).toBe(true);
});

it("can have the singleton instance reset", ()=> {
    // arrange
    const previous = CollectionController.getInstance();

    // act
    CollectionController.resetInstance();
    const updated = CollectionController.getInstance();

    // assert
    expect(Object.is(previous, updated)).toBe(false);
});

it("initializes with an empty collection", ()=> {
    // arrange & act
    const target = CollectionController.getInstance();

    // act
    expect(target.collection).toBeTruthy();
    expect(target.collection.length).toEqual(0);
});

it("loads JSON string from file and loads from JSON", async ()=> {
    // arrange
    const testFileContent = JSON.stringify(validCollectionData);
    const testFile = new File([testFileContent], "collection.json");
    testFile.text = jest.fn(()=> Promise.resolve(testFileContent)); // mock text function, because it does not exist in JSDOM
    
    const target = CollectionController.getInstance();
    
    target.loadCollectionFromJSON = jest.fn((x: string) => Promise.resolve(0));

    // act
    const result = await target.loadCollectionFromFile(testFile);

    // assert
    expect(result).toEqual(0);
    expect(target.loadCollectionFromJSON).toBeCalledTimes(1);
});

it("loads JSON objects from string and attempts to load as collection", async ()=> {
    // arrange
    const target = CollectionController.getInstance();
    const testData = JSON.stringify(validCollectionData);

    target.loadCollection = jest.fn((x: Array<Game>)=> Promise.resolve(0));
    
    // act
    const result = await target.loadCollectionFromJSON(testData);

    // assert
    expect(result).toBe(0);
    expect(target.loadCollection).toBeCalledTimes(1);
});

it("loads all valid games into the in-memory collection", async ()=> {
    // arrange
    const target = CollectionController.getInstance();

    // act
    const result = await target.loadCollection(validCollectionData);

    // assert
    expect(result).toEqual(0);
    expect(target.collection.length).toEqual(validCollectionData.length);
});

it("saves a game collection from memory into local storage", async ()=> {
    // arrange
    const target = CollectionController.getInstance();
    const expectedKey = `${CollectionController.STORAGE_PREFIX}_collection`;
    await target.loadCollection(validCollectionData);

    // act
    target.saveCollection();

    // assert
    const result = localStorage.getItem(expectedKey); 
    expect(result).not.toBeNull();
    expect(JSON.parse(result)).toStrictEqual(target.collection);
});