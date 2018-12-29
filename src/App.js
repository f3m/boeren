import React, { Component } from "react";
import { EngineExtractors } from "./components/engine-extractors";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          Welcome to the Boeren project, esteemed colleague!
        </header>
        <div>
          <EngineExtractors />
        </div>
      </div>
    );
  }
}

export default App;
