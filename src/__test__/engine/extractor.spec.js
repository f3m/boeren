import Engine from "../../engine/engine";
import { Extractor } from "../../engine/extractor";
import { createFrequencyExtractor } from "../../engine/frequency-extractor";
import exampleTransactions from "./example-extractors";
const moment = require("moment");

describe("the Extractor class", () => {
  it("returns 12 rows when given one monthly row", () => {
    let engine = new Engine(exampleTransactions.monthly);
    let monthlyExtractor = createFrequencyExtractor("monthly", new Date());
    engine.addExtractor(monthlyExtractor);
    let result = engine.run();
    expect(result.length).toEqual(12);
  });

  it("returns less than 12 rows when given one monthly row with a final payment field", () => {
    let monthlyTransactions = exampleTransactions.monthly;
    monthlyTransactions[0].finalPayment = JSON.stringify(
      moment(new Date()).add(8, "month")
    ).substr(1, 10);
    let engine = new Engine(monthlyTransactions);
    let monthlyExtractor = createFrequencyExtractor("monthly", new Date());
    engine.addExtractor(monthlyExtractor);
    let result = engine.run();
    expect(result.length).toEqual(8);
  });

  it("returns true when the rawRow's criteria matches the trigger value", () => {
    let this_extractor = new Extractor();
    this_extractor.criteria = "frequency";
    this_extractor.trigger = "monthly";
    const rawRow = { frequency: "monthly" };
    expect(this_extractor.applies(rawRow)).toEqual(true);
  });

  it("returns false when the rawRow's criteria does not match the trigger value", () => {
    let this_extractor = new Extractor();
    this_extractor.criteria = "frequency";
    this_extractor.trigger = "monthly";
    const rawRow = { frequency: "weekly" };
    expect(this_extractor.applies(rawRow)).toEqual(false);
  });

  it("returns the rawRow value when asked to run a simple transform", () => {
    let this_extractor = new Extractor();
    const rawRow = { frequency: "weekly" };
    const result = this_extractor.transform(null, rawRow, null, null, null);
    expect(result).toEqual(rawRow);
  });
});
