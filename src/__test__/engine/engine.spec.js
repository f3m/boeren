import Engine from "../../engine/engine";
import exampleTransactions from "./example-transactions";

describe("the DefaultEngine class", () => {
  it("adds an extractor", () => {
    const this_engine = new Engine();
    this_engine.addExtractor("abc");
    expect(this_engine.extractors).toEqual(["abc"]);
  });

  it("adds multiple extractors", () => {
    const this_engine = new Engine();
    this_engine.addExtractor("abc");
    this_engine.addExtractor("def");
    expect(this_engine.extractors).toEqual(["abc", "def"]);
  });

  it("returns an empty array if no extractor is specified", () => {
    const this_engine = new Engine("TestEngine", exampleTransactions.monthly);
    const results = this_engine.run(new Date());
    expect(results).toEqual([]);
  });
});
