import React, { Component} from "react";
import "./app.css";

interface AppProps {
  name?: string
}

class App extends Component {
  constructor(props: AppProps) {
    super(props);
  }

  render(){
    return(
      <div className="App">
        <h1>Hello, {(this.props.name) ? this.props.name : "World"}!</h1>
      </div>
    );
  }
}

export default App;