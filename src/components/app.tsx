import * as React from "react";

import styles from "../styles/app.module.css";
import logo from "../assets/logo.png";

import AppTitle from "./app-title";

interface AppProps {
  name?: string;
}

class App extends React.Component<AppProps> {
  render(){
    return(
      <>
        <header data-testid="app_header" className={styles.AppHeader} >
          <img data-testid="app_logo" src={logo} alt="Pixelated image of a Super Nintendo controller plugged into the HTML5 logo through a black cable" />
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