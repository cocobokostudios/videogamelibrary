import Ajv, { KeywordDefinition } from "ajv";

import ILogger from "../utils/ILogger";
import ConsoleLogger from "../utils/ConsoleLogger";
import * as GameSchema from "../schemas/game.schema.json";
import { isValidElement } from "react";

/**
 * Creates a Game object that represents a game in a collection.
 * @class
 * 
 */
class Game {
    /** @member {string} gameId Unique identifier for the game */
    public gameId: string;
    /** @member {string} title The title of the game that is displayed in user interfaces */
    public title: string;
    /** @member {string} platformId Unique identifier that references the platform the game runs on  */
    public platformId: string;
    /** @member {string} regionId Unique identifier that references the region the game is for  */
    public regionId: string;
    /** @member {string} price The record CAD value of the game. Defaults to Number.NaN if left unset.  */
    public price: number;
    
    public static logger: ILogger = ConsoleLogger.getInstance();   // TODO: need to handle logging better for static
    private logger: ILogger

    constructor(gameId: string, gameTitle: string, platformId: string, regionId: string, price: number = Number.NaN, logger: ILogger = ConsoleLogger.getInstance()) {
        this.logger = logger;
        
        this.gameId = gameId;
        this.title = gameTitle;
        this.platformId = platformId;
        this.regionId = regionId;
        this.price = price;
    }


    /**
     * Determine if the Game object has all required fields.
     * @returns {boolean} True, if all required fields have valid values.
     */
    public hasRequiredFields() {
        let isValid: boolean = false;

        isValid = (this.gameId !== undefined && this.gameId.trim().length > 0) 
                    && (this.title !== undefined && this.title.trim().length > 0)
                    && (this.platformId !== undefined && this.platformId.trim().length > 0)
                    && (this.regionId !== undefined && this.regionId.trim().length > 0)
        
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