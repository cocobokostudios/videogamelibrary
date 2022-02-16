import * as React from "react";

import styles from "../styles/collection-explorer.module.css";

export const COLLECTION_EXPLORER_TEST_ID = "collection-explorer";

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
        const displayMessage = (this.props.sampleMsg) ? this.props.sampleMsg : "Welcome to the collection explorer";
        return (
            <section data-testid={COLLECTION_EXPLORER_TEST_ID} className={styles.CollectionExplorer} >
                {displayMessage} | {this.state.sampleCount}
            </section>
        )
    }
}
export default CollectionExplorer;