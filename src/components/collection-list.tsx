import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, registerOnThemeChangeCallback, SelectionMode } from "@fluentui/react";

import Game from "../models/game";
import Collection from "../models/collection";
import { PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";
import CollectionController from "../controllers/collection-controller";

export interface ICollectionListProps {
    title: string
    items: Array<Game>
}

const CollectionList : React.FunctionComponent<ICollectionListProps> = ({ items, title }) => {
    const defaultColumns: IColumn[] = [
        {
            key: "platformCol",
            name: "Platform",
            minWidth: 40,
            maxWidth: 60,
            onRender: (item: Game) => {
                return <span>{item.platformId}</span>
            }
        },
        {
            key: "titleCol",
            name: "Title",
            minWidth: 320,
            onRender: (item: Game) => {
                return <span>{item.title}</span>
            }
        },
        {
            key: "regionCol",
            name: "Region",
            minWidth: 40,
            maxWidth: 60,
            onRender: (item: Game) => {
                return <span>{item.regionId}</span>
            }
        },
        {
            key: "boxCol",
            name: "Has Box",
            minWidth: 40,
            maxWidth: 60,
            onRender: (item: Game) => {
                return <span>true</span>
            }
        },
        {
            key: "instructionsCol",
            name: "Has Instructions",
            minWidth: 40,
            maxWidth: 60,
            onRender: (item: Game) => {
                return <span>true</span>
            }
        },
        {
            key: "sealedCol",
            name: "Is Sealed",
            minWidth: 40,
            maxWidth: 60,
            onRender: (item: Game) => {
                return <span>false</span>
            }
        },
        {
            key: "priceCol",
            name: "Price",
            minWidth: 40,
            maxWidth: 60,
            onRender: (item: Game) => {
                return (Number.isNaN(item.price) === false) ? <span>{item.price}</span> : <span>-</span>
            }
        }
    ];

    const [columns, setColumns] = React.useState(defaultColumns);

    return (
        <section>
            <DetailsList
                items={items}
                columns={columns}
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
                />
        </section>
    );
};
export default CollectionList;