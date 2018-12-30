import React, { Component } from "react";
import DefaultEngine from "../engine/default-engine";
import rawTransactions from "../artefacts/raw-transactions.json";

export class EngineExtractors extends Component {
  engine = new DefaultEngine([]);

  handleExtractorToggle = extractor => {
    extractor.enabled = !extractor.enabled;
    // this.setState({engine:this.state.engine});
  };

  render() {
    return (
      <div className="EngineExtractors">
        <h1>{this.engine.engineName}: Extractors</h1>
        <ul>
          {this.engine.extractors.map(extractor => (
            <li key={`li_${extractor.name}`}>
              <input
                key={`input_${extractor.name}`}
                type="checkbox"
                value="true"
                checked="{extractor.enabled}"
                onClick={this.handleExtractorToggle(extractor)}
              />
              <div key={extractor.name}>{extractor.name}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
