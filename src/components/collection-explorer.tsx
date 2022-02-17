import * as React from "react";
import { CommandBar, ICommandBarItemProps } from "@fluentui/react";
import { registerIcons } from '@fluentui/react/lib/Styling';
import { initializeIcons } from "@fluentui/react";

import styles from "../styles/collection-explorer.module.css";

export const COLLECTION_EXPLORER_TESTID = "collection-explorer";
export const COLLECTION_EXPLORER_COMMAND_BAR_TESTID = "collection-explorere_commandbar";

const commandItems: ICommandBarItemProps[] = [
    {
        key: "fileCommandItem",
        text: "File",
        iconProps: { iconName: "DocumentManagement" }
    },
    {
        key: "exploreCommandItem",
        text: "Explore",
        iconProps: { iconName: "ExploreData" }
    }
]

interface CollectionExplorerProps {
    sampleMsg?: string;
}

interface CollectionExplorerState {
    sampleCount?: number;
}

class CollectionExplorer extends React.Component<CollectionExplorerProps, CollectionExplorerState> {
    state: CollectionExplorerState = {
        sampleCount: 0
    };

    render() {
        //const displayMessage = (this.props.sampleMsg) ? this.props.sampleMsg : "Welcome to the collection explorer";

        // setup react icons
        initializeIcons();

        return (
            <section data-testid={COLLECTION_EXPLORER_TESTID} className={styles.CollectionExplorer} >
                <header>
                    <CommandBar data-testid={COLLECTION_EXPLORER_COMMAND_BAR_TESTID} items={commandItems} />
                </header>
            </section>
        )
    }
}
export default CollectionExplorer;