import * as React from "react";

import styles from "../styles/app.module.css";

import AppTitle from "./app-title";
import AppLogo from "./app-logo";

interface AppProps {
  name?: string;
}

class App extends React.Component<AppProps> {
  render(){
    return(
      <>
        <header data-testid="app_header" className={styles.AppHeader} >
          <AppLogo />
          <AppTitle />
        </header>
        <main data-testid="app_main">
          Application goes here
        </main>
      </>
    );
  }
}

export default App;