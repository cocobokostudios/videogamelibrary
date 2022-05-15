import * as React from "react";
import { CommandBar, ICommandBarItemProps, Dialog, IDialogContentProps, DialogFooter, PrimaryButton, DefaultButton, IContextualMenuItemProps, TextField, Toggle, IconButton } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import styles from "../styles/collection-explorer.module.css";
import CollectionLoadDialogue from "./collection-load-dialogue";
import CollectionController from "../controllers/collection-controller";
import CollectionList from "./collection-list";
import Collection from "../models/collection";
import Game from "../models/game";

export const COLLECTION_EXPLORER_TESTID = "collection-explorer";
export const COLLECTION_EXPLORER_COMMAND_BAR_TESTID = "collection-explorer_commandbar";
export const COLLECTION_EXPLORER_LOAD_COLLECTION_DIALOG_TESTID = "collection-explorer_loadCollectionDialog";

const CollectionExplorer : React.FunctionComponent = () =>  {
    // state
    const [dialogueVisibility, { toggle: toggleDialogueVisibility }] = useBoolean(true);
    const [loadedCollection, setLoadedCollection] = React.useState<Collection>(new Collection("myLoadedCollection"));  
    const [activeCollection, setActiveCollection] = React.useState<Collection>(new Collection("myGameCollection"));
    const [isDefaultCollection, { toggle: toggleIsDefaultCollection, setTrue: setIsDefaultCollection, setFalse: unsetIsDefaultCollection }] = useBoolean(false);

    // handlers
    const onDialogueFileInputChange = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        // check for files
        const fileInput: HTMLInputElement = e.currentTarget as HTMLInputElement;
        if(fileInput && fileInput.files) {
            const files: FileList = fileInput.files;
            setLoadedCollection(await CollectionController.getInstance().loadCollectionFromFile(files[0]));
        } 
    }

    const onDialogueLoadButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // update the collection
        setActiveCollection(loadedCollection);
        if(loadedCollection.id === CollectionController.getInstance().loadDefaultCollection()?.id) {
            setIsDefaultCollection();
        }
        else {
            unsetIsDefaultCollection();
        }

        // clear loaded collection
        setLoadedCollection(new Collection("myLoadedCollection"));
        // close dialogue
        toggleDialogueVisibility();
    }

    const onDialogueCancelButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // clear loaded collection
        setLoadedCollection(new Collection("myLoadedCollection"));
        // close dialogue
        toggleDialogueVisibility();
    }

    // effect for loading default collection on mount
    React.useEffect(() => {
        const defaultCollection = CollectionController.getInstance().loadDefaultCollection();
        if(defaultCollection && defaultCollection.id !== activeCollection.id) {
            setActiveCollection(defaultCollection);
            setIsDefaultCollection();
        }
    }, []);

    // effect for setting the default collection
    React.useEffect(() => {
        if(isDefaultCollection === true && activeCollection) {
            CollectionController.getInstance().setDefaultCollection(activeCollection.id);
        }
        else if(isDefaultCollection === false && activeCollection.id === CollectionController.getInstance().loadDefaultCollection()?.id) {
            CollectionController.getInstance().clearDefaultCollection();
        }
    }, [isDefaultCollection]);

    return (
        <>
        <section data-testid={COLLECTION_EXPLORER_TESTID} className={styles.CollectionExplorer} >
            <header>
                <section className={styles.left}>
                    <TextField value={activeCollection.id} underlined />
                </section>
                <section className={styles.right}>
                    <IconButton ariaLabel="Load" iconProps={{ iconName: "Upload" }} onClick={toggleDialogueVisibility} />
                    <IconButton ariaLabel="Export" iconProps={{ iconName: "Download" }} />
                    <Toggle label={"Is Default"} checked={isDefaultCollection} inlineLabel onClick={toggleIsDefaultCollection} />
                </section>
            </header>
            <main>
                <CollectionList 
                    items={activeCollection.items} />
            </main>
        </section>
        <CollectionLoadDialogue
            hidden={dialogueVisibility}
            onCancelClick={onDialogueCancelButtonClick}
            onDismissClick={toggleDialogueVisibility}
            onLoadClick={onDialogueLoadButtonClick}
            onFileInputChange={onDialogueFileInputChange}
            />
        </>
    )
}
export default CollectionExplorer;