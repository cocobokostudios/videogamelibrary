import Game from "../models/game";

class CollectionController {
    
    public static readonly STORAGE_PREFIX = "vgl";

    private constructor() { 
        this.collection = new Array<Game>();
    }   
    private static instance: CollectionController = new CollectionController();

    public collection: Array<Game>;
    
    /**
     * Gets or intializes the singleton instance of the CollectionController.
     * @returns {CollectionController} Singleton instance of CollectionController
     */
    static getInstance() {
        return CollectionController.instance;
    }

    /**
     * Resets the current instance of CollectionController to a new instance.
     * @see {@function getInstance} for retrieving instance.
     */
    static resetInstance() {
        CollectionController.instance = new CollectionController();
    }

    /**
     * @param {File} file File object from FileList containing collection data.
     * @returns {number} Returns Number of invalid game objects read from the file.
     */
    async loadCollectionFromFile(file: File) {
        const fileContent = await file.text();

        return this.loadCollectionFromJSON(fileContent);
    }

    /**
     * Loads all valid from JSON string into CollectionExplorer collection property.
     * @param collection JSON array of {@type Game} objects.
     * @returns {number} Returns Number of invalid game objects read from the collection.
     */
    async loadCollectionFromJSON(collection: string) {
        const parsedCollection: Array<Game> = JSON.parse(collection)
        // TODO: get invalid entries
        return this.loadCollection(parsedCollection);
    }

    /**
     * Replaces current collection with the provided Array.
     * @param collection {Array<Game>} Array of {@type Game} objects to replace the current collection.
     * @returns {number} Number of invalid game objects from imported collection.
     */
    async loadCollection(collection: Array<Game>) {
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