import { _ } from "ajv";
import Game, { IGame } from "./game";

export interface ICollection {
    id: string;
    items: Array<IGame>;
}

/**
 * Object containing a collection of Game objects and corresponding metadata.
 * @class
 * @member {string} id the unique identifier of the collection. Usually the file name, without suffix.
 * @member {Array<Game>} items Game objects that make up the collection. 
 */
class Collection implements ICollection {
    // members
    id: string;
    items: Array<Game>;

    constructor(id: string, items: Array<Game> = new Array<Game>()) {
        this.id = id;
        this.items = items;
    }

    /**
     * Returns a data-only version of the Collection, including all the games included as items.
     * @returns ICollection containing only data values of itself and the items.
     * @example
     *  localStorage.setItem(storageKey, JSON.stringify(collection.serialize()));
     */
    serialize(): ICollection {
        const dataObject : ICollection = {
            id: this.id,
            items: Game.serializeArray(this.items)
        }
        return dataObject;
    }

    /**
     * Static version of cooresponding instance function. Returns a data-only version of the Collection, including all the games included as items.
     * @returns ICollection containing only data values of itself and the items.
     * @example
     *  const myColl = new Collection('myId', new Array<Game>())
     *  localStorage.setItem(storageKey, JSON.stringify(Collection.serialize(myColl)));
     */
    static serialize(collection: Collection): ICollection {
        return collection.serialize();
    }
}
export default Collection;