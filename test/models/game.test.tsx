import { mock } from "jest-mock-extended";

import Game from "../../src/models/game";
import ILogger from "../../src/utils/ILogger";

beforeEach(()=> {
    Game.logger = mock<ILogger>();
});

it("can be instantiated", ()=> {
    // arrange & act
    const target: Game = new Game();  

    // assert
    expect(target).toBeInstanceOf(Game);
});

it("can validate JSON string against the JSON schema", ()=> {
    // arrange
    const validGameData = {
        gameId: "sample-game",
        title: "Sample Game",
        platform: "Sample Platform"
    }
    const missingGameId = {
        title: "Sample Game",
        platform: "Sample Platform"
    }
    const missingTitle = {
        gameId: "sample-game",
        platform: "Sample Platform"
    }
    const missingPlatform = {
        gameId: "sample-game",
        title: "Sample Game",
    }

    // act
    const validResult = Game.validate(JSON.stringify(validGameData));
    const missingGameIdResult = Game.validate(JSON.stringify(missingGameId));
    const missingTitleResult = Game.validate(JSON.stringify(missingTitle));
    const missingPlatformResult = Game.validate(JSON.stringify(missingPlatform));

    // assert
    expect(validResult).toEqual(true);
    expect(missingGameIdResult).toEqual(false);
    expect(missingTitleResult).toEqual(false);
    expect(missingPlatformResult).toEqual(false);
});

it("returns false on invalid JSON string", ()=> {
    // arrange
    const invalidJSON = "invalid json is this!";

    // act 
    const result = Game.validate(invalidJSON);

    // assert
    expect(result).toBe(false);
    expect(Game.logger.warn).toBeCalled();
});