import { _ } from "ajv";
import Game, { IGame } from "../../src/models/game";

it("intializes price as NaN if null or not included", ()=> {
    // arrange and act
    const testGame = new Game("testGameId", "testTitle", "testPlatform", "testRegion");
    const dataObj : IGame = {
        gameId: "testStatidId",
        title: "testStaticTitle",
        platformId: "testStaticPlatform",
        regionId: "testStaticRegion",
        price: null
    };
    const testStaticGame = Game.create(dataObj);

    // assert
    expect(testGame.price).toBeNaN();
    expect(testStaticGame.price).toBeNaN();
});

describe("Serialization", ()=> {
    it("serializes all properties to JSON", ()=> {
        // arrange
        const testId = "testId";
        const testTitle = "testTitle";
        const testPlatform = "testPlatform";
        const testRegion = "testRegion";
        const testPrice = 1.23;
        const targetNoPrice = new Game(testId, testTitle, testPlatform, testRegion);
        const targetWithPrice = new Game(testId, testTitle, testPlatform, testRegion, testPrice);
    
        // act
        const resultNoPrice : IGame = targetNoPrice.serialize();
        const resultWithPrice : IGame = targetWithPrice.serialize();
    
        // assert
        const expectedNoPriceObject : IGame =
        {
            gameId: testId,
            title: testTitle,
            platformId: testPlatform,
            regionId: testRegion,
            price: Number.NaN
        };
        expect(resultNoPrice).toStrictEqual(expectedNoPriceObject);
    
        const expectedWithPriceObject : IGame =
        {
            gameId: testId,
            title: testTitle,
            platformId: testPlatform,
            regionId: testRegion,
            price: testPrice
        };
        expect(resultWithPrice).toStrictEqual(expectedWithPriceObject);
    });
    
    it("serializes all properties to JSON (static)", ()=> {
        // arrange
        const testId = "testId";
        const testTitle = "testTitle";
        const testPlatform = "testPlatform";
        const testRegion = "testRegion";
        const testPrice = 1.23;
        const targetNoPrice = new Game(testId, testTitle, testPlatform, testRegion);
        const targetWithPrice = new Game(testId, testTitle, testPlatform, testRegion, testPrice);
    
        // act
        const resultNoPrice : IGame = Game.serialize(targetNoPrice);
        const resultWithPrice : IGame = Game.serialize(targetWithPrice);
    
        // assert
        const expectedNoPriceObject : IGame =
        {
            gameId: testId,
            title: testTitle,
            platformId: testPlatform,
            regionId: testRegion,
            price: Number.NaN
        };
        expect(resultNoPrice).toStrictEqual(expectedNoPriceObject);
    
        const expectedWithPriceObject : IGame =
        {
            gameId: testId,
            title: testTitle,
            platformId: testPlatform,
            regionId: testRegion,
            price: testPrice
        };
        expect(resultWithPrice).toStrictEqual(expectedWithPriceObject);
    });
    
    it("serializes collection of games to JSON array", ()=> {
        // arrange, sample data
        const testId = "testId";
        const testTitle = "testTitle";
        const testPlatform = "testPlatform";
        const testRegion = "testRegion";
        const testPrice = 1.23;
    
        // arrange, array of games
        const game1 = new Game(testId, testTitle, testPlatform, testRegion);
        const game2 = new Game(testId, testTitle, testPlatform, testRegion, testPrice);
        const target : Array<Game> = [game1, game2];
    
        // act
        const result : Array<IGame> = Game.serializeArray(target);
    
        // assert
        const expectedData : Array<IGame> = [game1.serialize(), game2.serialize()];
        expect(result).toEqual(expectedData);
    });
});



