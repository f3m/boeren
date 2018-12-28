require('../../src/engine/engine');
const expect = require('chai');

describe('the Engine class', () => {

  it('adds an extractor', () => {
    const this_engine = new Engine();
    this_engine.addExtractor('abc');
    expect(this_engine.extractors).toEqual(['abc']);
  });

  it('adds multiple extractors', () => {
    const this_engine = new Engine();
    this_engine.addExtractor('abc');
    this_engine.addExtractor('def');
    expect(this_engine.extractors).toEqual(['abc', 'def']);
  });

});