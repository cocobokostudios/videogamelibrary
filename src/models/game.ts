import Ajv, { KeywordDefinition } from "ajv";

import ILogger from "../utils/ILogger";
import ConsoleLogger from "../utils/ConsoleLogger";
import * as GameSchema from "../schemas/game.schema.json";
import { isValidElement } from "react";

export interface IGame {
    gameId: string;
    title: string;
    platformId: string;
    regionId: string;
    price: number;
}

/**
 * Creates a Game object that represents a game in a collection. Use static method `create` to retrieve singleton instance.
 * @class
 * @member {string} title The title of the game that is displayed in user interfaces 
 * @member {string} platformId Unique identifier that references the platform the game runs on
 * @member {string} regionId Unique identifier that references the region the game is for
 * @member {string} price The record CAD value of the game. Defaults to Number.NaN if left unset.
 * @see create
 */
class Game implements IGame {
    
    public gameId: string;
    public title: string;
    public platformId: string;
    public regionId: string;
    public price: number;
    
    private logger: ILogger = ConsoleLogger.getInstance();

    constructor(id: string, title: string, platformId: string, regionId: string, price: number = Number.NaN) {        
        this.gameId = id;
        this.title = title;
        this.platformId = platformId;
        this.regionId = regionId;
        this.price = price;
    }

    /**
     * 
     * @param game IGame object to use pull data fields from.
     * @returns Game object
     */
    static create(game: IGame) : Game {
        if(game.price !== null) {
            return new Game(game.gameId, game.title, game.platformId, game.regionId, game.price);
        }
        else {
            return new Game(game.gameId, game.title, game.platformId, game.regionId);
        }
    }; 


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
     * Serialize the object to a data transfer object that contains only the data fields and their values. Use @function serializeArray for collections of game objects.
     * @returns IGame data transfer object with only the populated data fields.
     * @example
     *  const myIGame = game.serialize();
     *  const jsonGameData = JSON.stringify(myIGame);
     *  console.log(`This is the JSON data: ${jsonGameData}.`);
     * @see serializeArray
     * @returns {IGame} object containing data field values
     */
    public serialize() : IGame {
        const gameData : IGame = {
            gameId: this.gameId,
            title: this.title,
            platformId: this.platformId,
            regionId: this.regionId,
            price: (Number.isNaN(this.price)) ? Number.NaN : this.price
        };
        return gameData;
    }

    /**
     * Serialize the object to a data transfer object that contains only the data fields and their values. Use @function serializeArray for collections of game objects.
     * @returns IGame data transfer object with only the populated data fields.
     * @example
     *  const myGame = game.serialize();
     *  const jsonGameData = JSON.stringify(myIGame);
     *  console.log(`This is the JSON data: ${jsonGameData}.`);
     * @see serializeArray
     * @returns {IGame} object containing data field values
     */
    static serialize(game: Game) : IGame {
        return game.serialize();
    }

    /**
     * Turns array of Games into IGame objects containing only data field values.
     * @param games Array of Game objects.
     * @returns {Array<IGame>} Array of IGame objects, containing only data values.
     * @example
     *  const dataObject : ICollection = {
     *     id: this.id,
     *      items: Game.serializeArray(this.items)
     *  }
     */
    static serializeArray(games: Array<Game>) : Array<IGame> {
        return games.map<IGame>((g: Game)=> Game.serialize(g));
    }

}
export default Game;