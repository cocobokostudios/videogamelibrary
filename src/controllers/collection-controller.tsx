import Game from "../models/game";
import ConsoleLogger from "../utils/ConsoleLogger";
import ILogger from "../utils/ILogger";

import Papa from "papaparse";
import { PanelType } from "@fluentui/react";

class CollectionController {
    
    public static readonly STORAGE_PREFIX = "vgl";

    private constructor(logger: ILogger = ConsoleLogger.getInstance()) { 
        this.collection = new Array<Game>();
        this.logger = logger;
        
    }   
    private static instance: CollectionController;

    public collection: Array<Game>;
    public readonly logger: ILogger;
    
    /**
     * Gets or intializes the singleton instance of the CollectionController.
     * @returns {CollectionController} Singleton instance of CollectionController
     */
    static getInstance() : CollectionController {
        if(!CollectionController.instance) {
            CollectionController.instance = new CollectionController();
        }

        return CollectionController.instance;
    }

    /**
     * Resets the current instance of CollectionController to a new instance.
     * @returns {@type CollectionController} Returns the instance of CollectionCollection, same as {@function getInstance} would.
     * @see {@function getInstance} for retrieving instance.
     */
    static resetInstance(logger?: ILogger) : CollectionController {
        if(logger) {
            CollectionController.instance = new CollectionController(logger);
        }
        else {
            CollectionController.instance = new CollectionController();
        }

        return CollectionController.getInstance();
    }

    /**
     * @param {File} file CSV File object from FileList containing collection data.
     * @returns {Array<Game>} Returns the collection of {@type Game} objects loaded from the provided file.
     */
    async loadCollectionFromFile(file: File) : Promise<Array<Game>> {
        const fileContent = await file.text();

        // TODO: Add logic to support other file types

        return this.loadCollectionFromCSV(fileContent);
    }

    /**
     * Loads all valid from JSON string into CollectionExplorer collection property.
     * @param collection JSON array of {@type Game} objects.
     * @returns {number} Returns Number of invalid game objects read from the collection.
     */
    async loadCollectionFromJSON(collection: string) : Promise<number> {
        const parsedCollection: Array<Game> = JSON.parse(collection)
        // TODO: get invalid entries
        return this.loadCollection(parsedCollection);
    }

    /**
     * 
     * @param collection CSV file contents
     * @returns {Array<Game>} Array of {@type Game} objects, which are the collection loaded from the CSV string.
     */
    async loadCollectionFromCSV(collection: string) : Promise<Array<Game>> {
        const parsedCollection: Array<Game> = [];
        const parserOptions : Papa.ParseConfig = {
            header: true,
            skipEmptyLines: true,
            transform: (value: string) => {
                return value.trim();
            },
            complete: (result: Papa.ParseResult<Game>) => {
                // although it is cast as Game, it was not created using the constructor
                parsedCollection.push(...result.data.map((game: Game) => {
                    const newGame = new Game(game.gameId, game.title, game.platformId);
                    if(newGame.isComplete() === false) {
                        this.logger.warn(`Invalid game: ${newGame}`);
                    }
                    return newGame;
                }));
            }
        };
        
        Papa.parse(collection, parserOptions);
        return parsedCollection;
    }

    /**
     * Replaces current collection with the provided Array.
     * @param collection {Array<Game>} Array of {@type Game} objects to replace the current collection.
     * @returns {number} Number of invalid game objects from imported collection.
     */
    async loadCollection(collection: Array<Game>) : Promise<number> {
        this.collection = collection;
        return 0;   // TODO: get invalid entries
    }

    /**
     * Saves collection in memory to local storage.
     * @returns {void}
     */
    saveCollection() {
        localStorage.setItem(`${CollectionController.STORAGE_PREFIX}_collection`, JSON.stringify(this.collection));
    }
}
export default CollectionController;