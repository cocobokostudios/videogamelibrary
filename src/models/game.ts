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
 * Creates a Game object that represents a game in a collection.
 * @class
 * 
 */
class Game implements IGame {
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
    
    private logger: ILogger = ConsoleLogger.getInstance();

    constructor(id: string, title: string, platformId: string, regionId: string, price: number = Number.NaN) {        
        this.gameId = id;
        this.title = title;
        this.platformId = platformId;
        this.regionId = regionId;
        this.price = price;
    }

    static create(game: IGame) : Game {
        const newGame = Object.assign(Object.create(Game), game);
        if(newGame.price === null || newGame.price === undefined) {
            newGame.price = Number.NaN;
        }
        return newGame;
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

    static serialize(game: Game) : IGame {
        return game.serialize();
    }

    static serializeArray(games: Array<Game>) : Array<IGame> {
        return games.map<IGame>((g: Game)=> Game.serialize(g));
    }

}
export default Game;