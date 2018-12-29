import React, { Component } from "react";
import DefaultEngine from "../engine/default-engine";
import rawTransactions from "../artefacts/raw-transactions.json";

const engine = new DefaultEngine(rawTransactions);

export class EngineExtractors extends Component {
  render() {
    return (
      <div className="EngineExtractors">
        <h1>{engine.engineName}: Extractors</h1>
        <ul>
          {engine.extractors.map(extractor => (
            <li key={`li_${extractor.name}`}>
              <input
                key={`input_${extractor.name}`}
                type="checkbox"
                value="true"
                selected
              />
              <div key={extractor.name}>{extractor.name}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
