import { _ } from "ajv";
import Game, { IGame } from "./game";

export interface ICollection {
    id: string;
    items: Array<IGame>;
}

class Collection implements ICollection {
    id: string;
    items: Array<Game>;

    constructor(id: string, items: Array<Game> = new Array<Game>()) {
        this.id = id;
        this.items = items;
    }

    serialize(): ICollection {
        const dataObject : ICollection = {
            id: this.id,
            items: Game.serializeArray(this.items)
        }
        return dataObject;
    }

    static serialize(collection: Collection): ICollection {
        return collection.serialize();
    }
}
export default Collection;