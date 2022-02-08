import * as React from "react";
import "../style/app.css";
import logo from "../assets/logo.png";

interface AppProps {
  name?: string;
}

class App extends React.Component<AppProps> {
  render(){
    return(
      <div className="App">
        <h1>Hello, {(this.props.name) ? this.props.name : "World"}!</h1>
        <img src={logo} alt="Pixelated image of a Super Nintendo controller plugged into the HTML5 logo through a black cable" />
      </div>
    );
  }
}

export default App;