import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react/lib/DetailsList";

import Game from "../models/game";

export interface ICollectionListProps {
    items: Array<Game>;
}

const CollectionList : React.FunctionComponent<ICollectionListProps> = (props) => {
    const columns: IColumn[] = [
        {
            key: "platformCol",
            name: "Platform",
            minWidth: 35,
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
            minWidth: 1,
            headerClassName: "hide-small",
            className: "hide-small",
            onRender: (item: Game) => {
                return <span>Region</span>
            }
        },
        {
            key: "boxCol",
            headerClassName: "hide-medium",
            className: "hide-medium",
            name: "Has Box",
            minWidth: 1,
            onRender: (item: Game) => {
                return <span>true</span>
            }
        },
        {
            key: "instructionsCol",
            headerClassName: "hide-medium",
            className: "hide-medium",
            name: "Has Instructions",
            minWidth: 1,
            onRender: (item: Game) => {
                return <span>true</span>
            }
        },
        {
            key: "sealedCol",
            headerClassName: "hide-medium",
            className: "hide-medium",
            name: "Is Sealed",
            minWidth: 1,
            onRender: (item: Game) => {
                return <span>false</span>
            }
        },
        {
            key: "priceCol",
            name: "Price",
            headerClassName: "hide-small",
            className: "hide-small",
            minWidth: 1,
            onRender: (item: Game) => {
                return <span>$ 1.23</span>
            }
        }
    ];


    return (
        <>
        <p>There are {props.items.length} games on display.</p>
        <DetailsList
            items={props.items}
            columns={columns}
            layoutMode={DetailsListLayoutMode.justified}
            selectionMode={SelectionMode.none}
            />
        </>
    );
};
export default CollectionList;