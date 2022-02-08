import * as React from "react";
import "./app.css";

interface AppProps {
  name?: string;
}

class App extends React.Component<AppProps> {
  render(){
    return(
      <div className="App">
        <h1>Hello, {(this.props.name) ? this.props.name : "World"}!</h1>
      </div>
    );
  }
}

export default App;