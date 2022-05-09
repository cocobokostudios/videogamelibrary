import ILogger from "../utils/ILogger";
import Game from "./game";

class Collection {
    id: string;
    items: Array<Game>;

    constructor(id: string, items: Array<Game> = new Array<Game>()) {
        this.id = id;
        this.items = items;
    }
}
export default Collection;