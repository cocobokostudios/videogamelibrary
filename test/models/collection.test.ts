import Collection from "../../src/models/collection";
import Game from "../../src/models/game";

it("initializes with an empty list by defaults", () => {
    // arrange
    const testId = "testId";

    // act
    const result = new Collection(testId);

    // assert
    expect(result.items).toEqual(new Array<Game>());
});

describe("Serialization", () => {
    it("serializes only data properties to JSON", () => {
        // arrange
        const testId : string = "testCollectionId";
        const testGame1 = new Game("testGameId", "testTitle", "testPlatform", "testRegion");
        const testGame2 = new Game("testGameId2", "testTitle2", "testPlatform2", "testRegion2", 1.23);   
        const testItems : Array<Game> = [testGame1, testGame2];

        // act
        const result = new Collection(testId, testItems).serialize();

        // assert
        const expectedResultData = {
            id: testId,
            items: [
                testGame1.serialize(),
                testGame2.serialize()
            ]
        };
        expect(result).toBe(JSON.stringify(expectedResultData));
    });

    it("serializes only data properties to JSON (static)", () => {
        // arrange
        const testId : string = "testCollectionId";
        const testGame1 = new Game("testGameId", "testTitle", "testPlatform", "testRegion");
        const testGame2 = new Game("testGameId2", "testTitle2", "testPlatform2", "testRegion2", 1.23);   
        const testItems : Array<Game> = [testGame1, testGame2];

        // act
        const testCollection = new Collection(testId, testItems);
        const result = Collection.serialize(testCollection);

        // assert
        const expectedResultData = {
            id: testId,
            items: [
                testGame1.serialize(),
                testGame2.serialize()
            ]
        };
        expect(result).toBe(JSON.stringify(expectedResultData));
    });
});