import * as React from "react";

import styles from "../styles/app.module.css";

import AppTitle from "./app-title";
import AppLogo from "./app-logo";
import CollectionExplorer from "./collection-explorer";

interface AppProps {
  name?: string;
}

const App: React.FunctionComponent<AppProps> = ((props)=> {
    return (
      <>
        <header data-testid="app_header" className={styles.AppHeader} >
          <AppLogo />
          <AppTitle />
        </header>
        <main data-testid="app_main">
          <CollectionExplorer />
        </main>
      </>
    );
});
export default App;