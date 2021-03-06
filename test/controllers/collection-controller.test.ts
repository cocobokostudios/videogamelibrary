import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

import CollectionController from "../../src/controllers/collection-controller";
import Game from "../../src/models/game";
import Collection from "../../src/models/collection";
import ILogger from "../../src/utils/ILogger";


const mockLogger : ILogger = {
    error: jest.fn(),
    warn: jest.fn()
};
beforeEach(()=> {
    localStorage.clear();
    jest.clearAllMocks();
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

describe("Save Collection", ()=> {
    it("saves the collection to local storage", ()=> {
        // arrange
        const testCollectionId = "collectionId";
        const testCollectionItems : Array<Game> = [
            new Game("game1_snes", "Game One", "snes", "na"),
            new Game("game2_snes", "Game Two", "snes", "na"),
            new Game("game3_snes", "Game Three", "snes", "na")
        ];
        const testCollection = new Collection(testCollectionId, testCollectionItems);

        // act
        const target = CollectionController.getInstance();
        target.saveCollection(testCollection);

        // assert
        expect(localStorage.getItem(`vgl_collection_${testCollectionId}`)).not.toBe(undefined);
        expect(localStorage.getItem(`vgl_collection_${testCollectionId}`)).toEqual(JSON.stringify(testCollection.serialize()));
    });

    it("saves the ID of the default collection to local storage as config", ()=> {
        // arrange
        const defaultCollectionId = "myCollectionId";

        // act
        const target = CollectionController.getInstance();
        target.setDefaultCollection(defaultCollectionId);

        // assert
        expect(localStorage.getItem(`vgl_config_defaultCollection`)).not.toBe(undefined);
        expect(localStorage.getItem(`vgl_config_defaultCollection`)).toEqual(defaultCollectionId);
    });

    it("clears the ID of the default collection in local storage", ()=> {
        // arrange, local storage
        const defaultCollectionId = "myCollectionId";
        localStorage.setItem("vgl_config_defaultCollection", defaultCollectionId);

        // act
        const target = CollectionController.getInstance();
        target.clearDefaultCollection();

        // assert
        expect(localStorage.getItem("vgl_config_defaultCollection")).toBe(null);
    });
});

describe("Load Collection", ()=> {
    it("loads the named collection from local storage", ()=> {
        // arrange data
        const testCollectionId = "testCollection";
        const testCollectionItems : Array<Game> = [
            new Game("game1_snes", "Game One", "snes", "na"),
            new Game("game2_snes", "Game Two", "snes", "na"),
            new Game("game3_snes", "Game Three", "snes", "na")
        ];
        const testCollection = new Collection(testCollectionId, testCollectionItems); 

        // arrange local storage
        jest.spyOn(Storage.prototype, "getItem").mockImplementationOnce((key: string)=> {
            return JSON.stringify(testCollection.serialize());
        });

        // act
        const result = CollectionController.getInstance().loadCollection(testCollectionId);

        // assert
        expect(result).not.toBeUndefined();
        expect(result.id).toEqual(testCollectionId);
        expect(result.items).toEqual(testCollectionItems);
    });

    it("returns undefined if collection is not found in local storage", ()=> {
        // arrange, local storage
        jest.spyOn(localStorage, "getItem").mockImplementationOnce((key: string)=> {
            return null;
        });

        // act
        const target = CollectionController.getInstance();
        const result = target.loadCollection("thisIdDoesNotExist");

        // assert
        expect(result).not.toBeNull();
        expect(result).toBeUndefined();
    });

    it("loads the default collection stored in local storage or undefined if not found", ()=> {
        // arrange, data
        const testCollectionId = "testCollection";
        const testCollectionItems : Array<Game> = [
            new Game("game1_snes", "Game One", "snes", "na"),
            new Game("game2_snes", "Game Two", "snes", "na"),
            new Game("game3_snes", "Game Three", "snes", "na")
        ];
        const testCollection = new Collection(testCollectionId, testCollectionItems);
        // arrange, local storage
        jest.spyOn(localStorage, "getItem").mockImplementationOnce((key: string) => { return testCollectionId });   // returns storage key
        // arrange, CollectionController.loadCollection
        const mockLoadCollection = jest.fn((id: string)=> {
            return testCollection;
        });
        const target = CollectionController.getInstance();
        target.loadCollection = mockLoadCollection;

        // act
        const result = target.loadDefaultCollection();

        // assert
        expect(result).not.toBeUndefined();
        expect(result).toEqual(testCollection);
    });

    it("returns undefined if no default collection is set", ()=> {
        // arrange, local storage
        jest.spyOn(localStorage, "getItem").mockImplementationOnce((key: string)=> {
            return null;
        });

        // act
        const target = CollectionController.getInstance();
        const result = target.loadDefaultCollection();

        // arrange
        expect(result).toBeUndefined();
    });
});

describe("Import Collection File", ()=> {  
    it("parses CSV file into Game objects", async ()=> {
        // arrange
        const testCollectionId = "testCollection";
        const testFileContent = `
            gameId,title,platformId,regionId
            simcity_snes,SimCity,snes,na
            uncharted-waters_snes,Uncharted Waters,snes,na
            uncharted-waters_nes,Uncharted Waters,nes,na
            uncharted-waters-new-horizons_snes,Uncharted Waters: New Horizons,snes,na
        `.trim();
        const testFile = new File([testFileContent], `${testCollectionId}.csv`, {type: "text/csv"});
        testFile.text = jest.fn(()=> Promise.resolve(testFileContent)); // mock text function, because it does not exist in JSDOM
        const target = CollectionController.getInstance();

        // act
        const result : Collection = await target.importFromFile(testFile);

        // assert
        expect(result.id).toEqual(testCollectionId);
        expect(result.items.length).toEqual(4);
        expect(result.items[0].gameId).toBe("simcity_snes");
        expect(result.items[1].gameId).toBe("uncharted-waters_snes");
        expect(result.items[2].gameId).toBe("uncharted-waters_nes");
        expect(result.items[3].gameId).toBe("uncharted-waters-new-horizons_snes");
    });

    it("logs CSV entries unable to be parsed as warnings", async ()=> {
        // arrange file withone valid entry
        const testCollectionId = "testCollection"; 
        const testFileContent = `
            gameId,title,platformId,regionId
            invalid-entry_snes,,snes
            ,,nes,jp
            another_entry,title
            valid-game_snes,Valid Game,snes,jp
        `.trim();
        const testFile = new File([testFileContent], `${testCollectionId}.csv`, {type: "text/csv"});
        testFile.text = jest.fn(()=> Promise.resolve(testFileContent)); // mock text function, because it does not exist in JSDOM

        // arrange target to test
        const target = CollectionController.resetInstance(mockLogger);

        // act
        const result : Collection = await target.importFromFile(testFile);
``
        // assert
        expect(result.id).toEqual(testCollectionId);
        expect(result.items.length).toEqual(4);
        expect(mockLogger.warn).toBeCalledTimes(3);
    });
});

describe("Export Collection File", ()=> {
    it("returns an anchor element with object url and collection ID as file name", ()=> {
        // arrange, mock
        URL.createObjectURL = jest.fn(()=> `blob:https://www.test.com/12312-12312-12312-12312`);
        // arrange, data
        const testCollectionId = "testCollection";
        const testCollectionItems : Array<Game> = [
            new Game("game1_snes", "Game One", "snes", "na"),
            new Game("game2_snes", "Game Two", "snes", "na"),
            new Game("game3_snes", "Game Three", "snes", "na")
        ];
        const testCollection = new Collection(testCollectionId, testCollectionItems);

        // arrange, controller
        const target = CollectionController.getInstance();

        // act
        const result : HTMLAnchorElement = target.exportToCSV(testCollection);

        // assert
        expect(result.href).toMatch(/^blob:https/i);
        expect(result.download).toContain(`${testCollectionId}.csv`);
    });
});