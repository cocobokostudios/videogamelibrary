import * as React from "react";
import { CommandBar, ICommandBarItemProps, Dialog, IDialogContentProps, DialogFooter, PrimaryButton, DefaultButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import styles from "../styles/collection-explorer.module.css";
import CollectionController from "../controllers/collection-controller";
import Game from "../models/game";

export const COLLECTION_EXPLORER_TESTID = "collection-explorer";
export const COLLECTION_EXPLORER_COMMAND_BAR_TESTID = "collection-explorer_commandbar";
export const COLLECTION_EXPLORER_LOAD_COLLECTION_DIALOG_TESTID = "collection-explorer_loadCollectionDialog";

const CollectionExplorer : React.FunctionComponent = () =>  {
    const [hideLoadDialog, { toggle: toggleHideLoadDialog }] = useBoolean(true);
    const [loadedCollection, setLoadedCollection] = React.useState<Array<Game>>([]);
    const [collection, setCollection] = React.useState<Array<Game>>([]);

    const loadDialogContentProps: IDialogContentProps = {
        title: "Load Collection",
        showCloseButton: true,
        closeButtonAriaLabel: "Close"
    };
    const commandItems: ICommandBarItemProps[] = [
        {
            key: "loadCommandItem",
            text: "Load",
            iconProps: { iconName: "Upload" },
            onClick: toggleHideLoadDialog 
        }
    ];



    const onFileInputChange = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // check for files
        const fileInput: HTMLInputElement = e.currentTarget as HTMLInputElement;
        if(fileInput && fileInput.files) {
            const files: FileList = fileInput.files;
            setLoadedCollection(await CollectionController.getInstance().loadCollectionFromFile(files[0]));
        } 
    }

    const loadButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // update the collection
        setCollection(loadedCollection);

        // clear loaded collection
        setLoadedCollection([]);

        // close dialogue
        toggleHideLoadDialog();
    }

    const cancelButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // clear loaded collection
        setLoadedCollection([]);

        // close dialogue
        toggleHideLoadDialog();
    }

    return (
        <>
        <section data-testid={COLLECTION_EXPLORER_TESTID} className={styles.CollectionExplorer} >
            <header>
                <CommandBar data-testid={COLLECTION_EXPLORER_COMMAND_BAR_TESTID} items={commandItems} />
            </header>
            <main>
                <p>There are {collection.length} games in the collection.</p>
                <p>There are {loadedCollection.length} games in the loaded collection.</p>
            </main>
        </section>
        <Dialog
            hidden={hideLoadDialog}
            onDismiss={toggleHideLoadDialog}
            dialogContentProps={loadDialogContentProps}>
                Select a file to load your collection.
                <input id="loadCollectionInput"
                    type="file"
                    accept="text/csv"
                    onChange={onFileInputChange} />
            <DialogFooter>
                <PrimaryButton onClick={loadButtonClick} text="Load" />
                <DefaultButton onClick={cancelButtonClick} text="Cancel" />
            </DialogFooter>
        </Dialog>
        </>
    )
}
export default CollectionExplorer;