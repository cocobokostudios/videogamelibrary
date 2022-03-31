import Game from "../models/game";

class CollectionController {
    
    // singleton pattern
    private static instance: CollectionController;
    private constructor() { 
        this.collection = new Array<Game>();
    }   

    public collection: Array<Game>;
    
    /**
     * Gets or intializes the singleton instance of the CollectionController.
     * @returns {CollectionController} Singleton instance of CollectionController
     */
    static getInstance() {
        if(!CollectionController.instance) {
            CollectionController.instance = new CollectionController();
        }

        return CollectionController.instance;
    }

    /**
     * @param {string} filePath Path to the local file with game collection data
     * @returns {number} Returns Number of invalid game objects read from the file.
     */
    loadCollectionFromFile(filePath: string) {

    }

    /**
     * Loads all valid and invalid game entries from JSON array into CollectionExplorer collection property.
     * @param collection JSON array of {@type Game} objects.
     * @returns {number} Returns Number of invalid game objects read from the collection.
     */
    loadCollectionFromJSON(collection: Array<Game>) {

    }
}
export default CollectionController;