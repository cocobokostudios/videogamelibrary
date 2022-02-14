import * as React from "react";
import "../style/app.css";
import logo from "../assets/logo.png";
import AppTitle from "./app-title";

interface AppProps {
  name?: string;
}

class App extends React.Component<AppProps> {
  render(){
    return(
      <>
        <header data-testid="app_header">
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