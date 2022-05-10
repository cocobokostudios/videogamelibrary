import ILogger from "../utils/ILogger";
import Game from "./game";

class Collection {
    id: string;
    items: Array<Game>;

    constructor(id: string, items: Array<Game> = new Array<Game>()) {
        this.id = id;
        this.items = items;
    }

    serialize(): string {
        const dataObject = {
            id: this.id,
            items: [
                ...this.items.map(item => item.serialize())
            ]
        }
        return JSON.stringify(dataObject);
    }

    static serialize(collection: Collection): string {
        return collection.serialize();
    }
}
export default Collection;