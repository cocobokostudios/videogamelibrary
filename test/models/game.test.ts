import Game from "../../src/models/game";

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
    const resultNoPrice = targetNoPrice.serialize();
    const resultWithPrice = targetWithPrice.serialize();

    // assert
    const expectedNoPriceObject =
    {
        gameId: testId,
        title: testTitle,
        platformId: testPlatform,
        regionId: testRegion,
        price: Number.NaN.toString()
    };
    expect(resultNoPrice).toBe(JSON.stringify(expectedNoPriceObject));

    const expectedWithPriceObject =
    {
        gameId: testId,
        title: testTitle,
        platformId: testPlatform,
        regionId: testRegion,
        price: testPrice
    };
    expect(resultWithPrice).toBe(JSON.stringify(expectedWithPriceObject));
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
    const resultNoPrice = Game.serialize(targetNoPrice);
    const resultWithPrice = Game.serialize(targetWithPrice);

    // assert
    const expectedNoPriceObject =
    {
        gameId: testId,
        title: testTitle,
        platformId: testPlatform,
        regionId: testRegion,
        price: Number.NaN.toString()
    };
    expect(resultNoPrice).toBe(JSON.stringify(expectedNoPriceObject));

    const expectedWithPriceObject =
    {
        gameId: testId,
        title: testTitle,
        platformId: testPlatform,
        regionId: testRegion,
        price: testPrice
    };
    expect(resultWithPrice).toBe(JSON.stringify(expectedWithPriceObject));
});

it("serializes collection of games to JSON array", ()=> {
    // arrange, sample data
    const testId = "testId";
    const testTitle = "testTitle";
    const testPlatform = "testPlatform";
    const testRegion = "testRegion";
    const testPrice = 1.23;

    // arrange, collection
    const target = new Array<Game>();
    const game1 = new Game(testId, testTitle, testPlatform, testRegion);
    const game2 = new Game(testId, testTitle, testPlatform, testRegion, testPrice);
    target.push(game1, game2);

    // act
    const result = Game.serializeArray(target);

    // assert
    const expectedData = [
        game1.serialize(),
        game2.serialize()
    ];
    expect(result).toEqual(JSON.stringify(expectedData));
});


