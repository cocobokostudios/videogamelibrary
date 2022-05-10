import Game from "../models/game";
import Collection from "../models/collection";
import ConsoleLogger from "../utils/ConsoleLogger";
import ILogger from "../utils/ILogger";

import Papa from "papaparse";
import { PanelType } from "@fluentui/react";

class CollectionController {
    public static readonly STORAGE_PREFIX = "vgl";
    private static readonly DEFAULT_COLLECTION_STORAGE_KEY = `vgl_config_defaultCollection`;

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
                    const newGame = new Game(game.gameId, game.title, game.platformId, game.regionId);
                    if(newGame.hasRequiredFields() === false) {
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
     * Generate a key used to save and load the collection from storage.
     * @param collectionId ID of the @type {Collection} collection.
     * @returns {string} Storage key value
     */
    private generateCollectionStorageKey(collectionId: string) {
        return `vgl_collection_${collectionId}`;
    }

    /**
     * Replaces current collection with the provided Array.
     * @param collection {Array<Game>} Array of {@type Game} objects to replace the current collection.
     * @returns {number} Number of invalid game objects from imported collection.
     */
    loadCollection(collectionId: string) : Collection | undefined {
        const storageKey = this.generateCollectionStorageKey(collectionId);
        const data = localStorage.getItem(storageKey);
        if(data) {
            const collectionData = JSON.parse(data) as Collection;
            return new Collection(collectionData.id, collectionData.items);
        }
        else {
            return undefined;
        }
    }

    /**
     * Loads the collection saved as default collection.
     * @returns {Collection | undefined} Returns the collection loaded from storage, or undefined if no collection is found or no default collection is set.
     */
    loadDefaultCollection() : Collection | undefined {
        const storedValue = localStorage.getItem(CollectionController.DEFAULT_COLLECTION_STORAGE_KEY);
        if(storedValue === null) {
            return undefined;
        }
        else {
            return this.loadCollection(storedValue);
        }
    }

    /**
     * Saves collection in memory to local storage.
     * @param {Collection} collection The collection of games to save to storage.
     * @returns {void}
     */
    saveCollection(collection: Collection) {
        const storageKey = this.generateCollectionStorageKey(collection.id);
        localStorage.setItem(storageKey, collection.serialize());
    }

    /**
     * Stores the collectionId value as one to use when loading the default collection from storage.
     * @param collectionId ID value associated with the collection. Used for retrieving the collection.
     * @returns {void}
     */
    setDefaultCollection(collectionId: string) {
        localStorage.setItem(CollectionController.DEFAULT_COLLECTION_STORAGE_KEY, collectionId);
    }

    /**
     * Clear the default collection value in storage.
     */
    clearDefaultCollection() : void {
        localStorage.removeItem(CollectionController.DEFAULT_COLLECTION_STORAGE_KEY);
    }
}
export default CollectionController;