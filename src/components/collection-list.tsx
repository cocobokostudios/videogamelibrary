import * as React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "@fluentui/react";

import Game from "../models/game";
import { PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

export interface ICollectionListProps {
    collectionId: string;
    collectionTitle: string;
    items: Array<Game>;
}

const CollectionList : React.FunctionComponent<ICollectionListProps> = (props) => {
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
                return <span>JP</span>
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
                return <span>$ 1.23</span>
            }
        }
    ];

    const [isDefaultCollectionChecked, { toggle: toggleIsDefaultCollectionChecked }] = useBoolean(false);
    const [columns, setColumns] = React.useState(defaultColumns);

    const handleIsDefaultCheckedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        toggleIsDefaultCollectionChecked();
    }

    React.useEffect(()=> {
        // on state change, save the change here.
        //CollectionController.getInstance().setDefaultCollection(props.collectionId)
    }, [isDefaultCollectionChecked]);

    return (
        <section>
            <header>
                <h1>{props.collectionTitle}</h1>
                <label htmlFor="isDefaultCollection">Is Default Collection?</label>
                <input name="isDefaultCollection" type="checkbox" checked={isDefaultCollectionChecked} onChange={handleIsDefaultCheckedChange} />
                <p>There are {props.items.length} games on display.</p>
            </header>
            <DetailsList
                items={props.items}
                columns={columns}
                layoutMode={DetailsListLayoutMode.justified}
                selectionMode={SelectionMode.none}
                />
        </section>
    );
};
export default CollectionList;