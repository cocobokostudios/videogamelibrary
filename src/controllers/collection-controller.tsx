import Game from "../models/game";

class CollectionController {
    private static instance: CollectionController;
    
    private constructor() { }   // singleton pattern
    private getInstance() {
        if(!CollectionController.instance) {
            CollectionController.instance = new CollectionController();
        }

        return CollectionController.instance;
    }

    /**
     * @param {string} filePath Path to the local file with game collection data
     * @returns {void}
     */
    loadCollectionFromFile(filePath: string) {

    }

    loadCollection(collection: Array<Game>) {

    }
}
export default CollectionController;