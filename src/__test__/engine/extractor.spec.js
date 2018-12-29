import Engine from "../../engine/engine";
import { createExtractor } from "../../engine/extractor";
import exampleTransactions from "./example-extractors";

describe("the MonthlyExtractor class", () => {
  let engine = new Engine(exampleTransactions.monthly);
  let monthlyExtractor = createExtractor("monthly", new Date());
  engine.addExtractor(monthlyExtractor);

  it("returns 12 rows when given one monthly row", () => {
    let result = engine.run();
    expect(result.length).toEqual(12);
  });
});
