import * as React from "react";
import { CommandBar, ICommandBarItemProps, Dialog, IDialogContentProps } from "@fluentui/react";
import { initializeIcons } from "@fluentui/react";
import { useBoolean } from "@fluentui/react-hooks";

import styles from "../styles/collection-explorer.module.css";

export const COLLECTION_EXPLORER_TESTID = "collection-explorer";
export const COLLECTION_EXPLORER_COMMAND_BAR_TESTID = "collection-explorer_commandbar";

const CollectionExplorer : React.FunctionComponent = () =>  {
    const [hideLoadDialog, { toggle: toggleHideLoadDialog }] = useBoolean(true);
    const loadDialogContentProps: IDialogContentProps = {
        title: "Load Collection",
        showCloseButton: true,
        closeButtonAriaLabel: "Close"
    };

    const commandItems: ICommandBarItemProps[] = [
        {
            key: "exploreCommandItem",
            text: "Explore",
            iconProps: { iconName: "ExploreData" }
        },
        {
            key: "loadCommandItem",
            text: "Load",
            iconProps: { iconName: "Upload" },
            onClick: toggleHideLoadDialog
        }
    ]

    // setup react icons
    initializeIcons();

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
                This is the load collection dialog.
        </Dialog>
        </>
    )
}
export default CollectionExplorer;