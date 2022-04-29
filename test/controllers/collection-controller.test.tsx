import fs from "fs/promises";
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import { mock } from "jest-mock-extended";

import CollectionController from "../../src/controllers/collection-controller";
import Game from "../../src/models/game";
import ConsoleLogger from "../../src/utils/ConsoleLogger";
import ILogger from "../../src/utils/ILogger";

import validJSONCollectionData from "../data/test-collection.json";

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

describe("Load Collection", ()=> {  
    it("parses CSV file into Game objects", async ()=> {
        // arrange
        const testFileContent = `
            gameId,title,platformId
            simcity_snes,SimCity,snes
            uncharted-waters_snes,Uncharted Waters,snes
            uncharted-waters_nes,Uncharted Waters,nes
            uncharted-waters-new-horizons_snes,Uncharted Waters: New Horizons,snes
        `.trim();
        const testFile = new File([testFileContent], "collection.csv", {type: "text/csv"});
        testFile.text = jest.fn(()=> Promise.resolve(testFileContent)); // mock text function, because it does not exist in JSDOM
        const target = CollectionController.getInstance();

        // act
        const result = await target.loadCollectionFromFile(testFile);

        // assert
        expect(result.length).toEqual(4);
        expect(result[0].gameId).toBe("simcity_snes");
        expect(result[1].gameId).toBe("uncharted-waters_snes");
        expect(result[2].gameId).toBe("uncharted-waters_nes");
        expect(result[3].gameId).toBe("uncharted-waters-new-horizons_snes");
    });

    it("logs CSV entries unable to be parsed as warnings", async ()=> {
        // arrange file withone valid entry
        const testFileContent = `
            gameId,title,platformId
            invalid-entry_snes,,snes
            ,,nes
            another_entry,title
            valid-game_snes,Valid Game,snes
        `.trim();
        const testFile = new File([testFileContent], "collection.csv", {type: "text/csv"});
        testFile.text = jest.fn(()=> Promise.resolve(testFileContent)); // mock text function, because it does not exist in JSDOM
        // arrange mock logger
        const loggerMock = mock<ILogger>();

        // arrange target to test
        const target = CollectionController.resetInstance(loggerMock);

        // act
        const result = await target.loadCollectionFromFile(testFile);
``
        // assert
        expect(result.length).toEqual(4);
        expect(loggerMock.warn).toBeCalledTimes(3);
    });
    
    it.skip("saves a game collection from memory into local storage", async ()=> {
        // arrange
        const target = CollectionController.getInstance();
        const expectedKey = `${CollectionController.STORAGE_PREFIX}_collection`;
        await target.loadCollection(validJSONCollectionData);
    
        // act
        target.saveCollection();
    
        // assert
        const result = localStorage.getItem(expectedKey); 
        expect(result).not.toBeNull();
        expect(JSON.parse(result)).toStrictEqual(target.collection);
    });
});