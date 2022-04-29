import { mock } from "jest-mock-extended";

import Game from "../../src/models/game";
import ILogger from "../../src/utils/ILogger";

beforeEach(()=> {
    Game.logger = mock<ILogger>();
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
    const validResult = Game.validateJSON(JSON.stringify(validGameData));
    const missingGameIdResult = Game.validateJSON(JSON.stringify(missingGameId));
    const missingTitleResult = Game.validateJSON(JSON.stringify(missingTitle));
    const missingPlatformResult = Game.validateJSON(JSON.stringify(missingPlatform));

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
    const result = Game.validateJSON(invalidJSON);

    // assert
    expect(result).toBe(false);
    expect(Game.logger.warn).toBeCalled();
});