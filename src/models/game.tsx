import Ajv from "ajv";

import ILogger from "../utils/ILogger";
import ConsoleLogger from "../utils/ConsoleLogger";
import * as GameSchema from "../schemas/game.schema.json";

class Game {
    public game_id: string;
    public title: string;
    public platform: string;
    
    public static logger: ILogger = ConsoleLogger.getInstance();   // TODO: need to handle logging better for static
    private logger: ILogger

    constructor(logger: ILogger = ConsoleLogger.getInstance()) {
        this.logger = logger;
    }

    /**
     * Validates a JSON string against the Game JSON schema. 
     * @param {string} gameData JSON string that contains the game data
     * @returns {boolean} True, if JSON data is a valid Game object. 
     */
    static validate(gameData: string) {
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