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