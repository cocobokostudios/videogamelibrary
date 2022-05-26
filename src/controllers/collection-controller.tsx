import Game, { IGame } from "../models/game";
import Collection, { ICollection } from "../models/collection";
import ConsoleLogger from "../utils/ConsoleLogger";
import ILogger from "../utils/ILogger";

import Papa from "papaparse";

/**
 * @class
 */
class CollectionController {
    public static readonly STORAGE_PREFIX = "vgl";
    private static readonly DEFAULT_COLLECTION_STORAGE_KEY = `vgl_config_defaultCollection`;

    private constructor(logger: ILogger = ConsoleLogger.getInstance()) { 
        this.logger = logger;
    }   
    private static instance: CollectionController;
    private readonly logger: ILogger;
    
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
     * @param {ILogger} logger Object to use to log. Defaults to {@type ConsoleLogger}
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
     * @returns {Promise<Collection>} Collection object parsed from the CSV file.
     * @example
     *  const fileInput: HTMLInputElement = e.currentTarget as HTMLInputElement;
     *  if(fileInput && fileInput.files) {
     *      const files: FileList = fileInput.files;
     *      setLoadedCollection(await CollectionController.getInstance().loadCollectionFromFile(files[0]));
     *  } 
     */
    async importFromFile(file: File) : Promise<Collection> {
        const fileContent = await file.text();

        // TODO: Add logic to support other file types
        const collectionId = file.name.split(".")[0];
        return this.importFromCSV(collectionId, fileContent);
    }

    /**
     * 
     * @param collection CSV file contents
     * @returns {Promise<Collection>} Collection object parsed from the CSV file.
     * @example
     *  const myCSVContent = `...`;
     *  const result = await loadCollectionFromCSV(`myCollectionId`, myCSVContent);
     *  
     */
    async importFromCSV(collectionId: string, collection: string) : Promise<Collection> {
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
        return new Collection(collectionId, parsedCollection);
    }

    /**
     * Export a collection to CSV, delimited by ";"
     * @param collection The collection to export.
     * @returns 
     */
    exportToCSV(collection: Collection) : HTMLAnchorElement {
        const collectionData = collection.serialize();
        const parserOptions : Papa.UnparseConfig = {
            delimiter: ',',
            header: true
        };
        const csvData = Papa.unparse<IGame>(collectionData.items, parserOptions);
        
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(new Blob([csvData], {type: "text/csv"}));
        downloadLink.download = `${collection.id}.csv`;

        return downloadLink;
    }

    /**
     * Generate a key used to save and load the collection from storage.
     * @param collectionId ID of the @type {Collection} collection.
     * @returns {string} Storage key value
     * @private
     */
    private generateCollectionStorageKey(collectionId: string) {
        return `vgl_collection_${collectionId}`;
    }

    /**
     * Replaces current collection with the provided Array.
     * @param collection {Array<Game>} Array of {@type Game} objects to replace the current collection.
     * @returns {number} Number of invalid game objects from imported collection.
     * @example
     *  const result = loadCollection(`myCollectionId`);
     *  if(result !== undefined) {
     *      console.log(`collection of games found ${...result}`);
     *  }
     *  else {
     *      console.error(`no collection found`);
     *  }
     */
    loadCollection(collectionId: string) : Collection | undefined {
        const storageKey = this.generateCollectionStorageKey(collectionId);
        const data = localStorage.getItem(storageKey);
        if(data) {
            const collectionData = JSON.parse(data) as ICollection;
            const collectionItems = collectionData.items.map<Game>((game: IGame) => Game.create(game) );
            return new Collection(collectionData.id, collectionItems);
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
     * @example
     *  const myColl = new Collection(`myAwesomeCollection`,[]);
     *  saveCollection(myColl);
     */
    saveCollection(collection: Collection) {
        const storageKey = this.generateCollectionStorageKey(collection.id);
        localStorage.setItem(storageKey, JSON.stringify(collection.serialize()));
    }

    /**
     * Stores the collectionId value as one to use when loading the default collection from storage.
     * @param collectionId ID value associated with the collection. Used for retrieving the collection.
     * @returns {void}
     * @example
     *  setDefaultCollection(`myAwesomeCollection`);
     */
    setDefaultCollection(collectionId: string) {
        localStorage.setItem(CollectionController.DEFAULT_COLLECTION_STORAGE_KEY, collectionId);
    }

    /**
     * Clear the default collection value in storage.
     * @example
     *  clearDefaultCollection();
     */
    clearDefaultCollection() : void {
        localStorage.removeItem(CollectionController.DEFAULT_COLLECTION_STORAGE_KEY);
    }
}
export default CollectionController;