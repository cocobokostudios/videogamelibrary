import * as React from "react";
import { CommandBar, ICommandBarItemProps, Dialog, IDialogContentProps, DialogFooter, PrimaryButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import styles from "../styles/collection-explorer.module.css";
import CollectionController from "../controllers/collection-controller";

export const COLLECTION_EXPLORER_TESTID = "collection-explorer";
export const COLLECTION_EXPLORER_COMMAND_BAR_TESTID = "collection-explorer_commandbar";
export const COLLECTION_EXPLORER_LOAD_COLLECTION_DIALOG_TESTID = "collection-explorer_loadCollectionDialog";

const CollectionExplorer : React.FunctionComponent = () =>  {
    const [hideLoadDialog, { toggle: toggleHideLoadDialog }] = useBoolean(true);
    const loadDialogContentProps: IDialogContentProps = {
        title: "Load Collection",
        showCloseButton: true,
        closeButtonAriaLabel: "Close"
    };
    const collectionController = CollectionController.getInstance();

    const commandItems: ICommandBarItemProps[] = [
        {
            key: "loadCommandItem",
            text: "Load",
            iconProps: { iconName: "Upload" },
            onClick: toggleHideLoadDialog
        }
    ];

    const onFileInputChange = async (e:React.SyntheticEvent) => {
        e.preventDefault();

        // check for files
        const fileInput: HTMLInputElement = e.currentTarget as HTMLInputElement;
        if(fileInput && fileInput.files) {
            const files: FileList = fileInput.files;
            const loadedCollection = await CollectionController.getInstance().loadCollectionFromFile(files[0]);
            console.dir(loadedCollection);
        } 
    }

    return (
        <>
        <section data-testid={COLLECTION_EXPLORER_TESTID} className={styles.CollectionExplorer} >
            <header>
                <CommandBar data-testid={COLLECTION_EXPLORER_COMMAND_BAR_TESTID} items={commandItems} />
            </header>
            <main>
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
                <PrimaryButton onClick={toggleHideLoadDialog} text="Load" />
            </DialogFooter>
        </Dialog>
        </>
    )
}
export default CollectionExplorer;