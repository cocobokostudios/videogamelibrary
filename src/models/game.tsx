import Ajv, { KeywordDefinition } from "ajv";

import ILogger from "../utils/ILogger";
import ConsoleLogger from "../utils/ConsoleLogger";
import * as GameSchema from "../schemas/game.schema.json";
import { isValidElement } from "react";

class Game {
    public gameId: string;
    public title: string;
    public platformId: string;
    
    public static logger: ILogger = ConsoleLogger.getInstance();   // TODO: need to handle logging better for static
    private logger: ILogger

    constructor(gameId: string, gameTitle: string, platformId: string, logger: ILogger = ConsoleLogger.getInstance()) {
        this.gameId = gameId;
        this.title = gameTitle;
        this.platformId = platformId;

        this.logger = logger;
    }


    /**
     * Determine if the Game object has all required fields.
     * @returns {boolean} True, if all required fields have valid values.
     */
    public isComplete() {
        let isValid: boolean = false;

        isValid = (this.gameId !== undefined && this.gameId.trim().length > 0) 
                    && (this.title !== undefined && this.title.trim().length > 0)
                    && (this.platformId !== undefined && this.platformId.trim().length > 0);
        
        return isValid;
    }

    /**
     * Confirms that the object can be serialized to JSON, based on JSON schema.
     * @returns {boolean} True, game contains all required properties.
     * @see {@function validateJSON}
     */
    static validateGame(game: Game) {
        return Game.validateJSON(JSON.stringify(game));
    }

    /**
     * Validates a JSON string against the Game JSON schema. 
     * @param {string} gameData JSON string that contains the game data
     * @returns {boolean} True, if JSON data is a valid Game object. 
     */
    static validateJSON(gameData: string) {
        let isValid: Boolean = false;

        try {
            const toValidate = JSON.parse(gameData);
            
            const ajv = new Ajv();
            const validate = ajv.compile<Game>(GameSchema);
            isValid = validate(toValidate);
        } catch (error) {
            this.logger.warn(error.message);
            this.logger.warn(`Game.validate: Invalid JSON data. Received: ${gameData}`);
        }

        return isValid;
    }
}
export default Game;