import { createFrequencyExtractor } from "../../engine/frequency-extractor";

it("returns the first payment date when given a row where the date is the same as the start date's date", () => {
  const thisFrequencyExtractor = createFrequencyExtractor("monthly");
  const row = { paymentDate: "1st" };
  const result = thisFrequencyExtractor.getFirstPaymentDate(
    row,
    new Date("2018-01-01")
  );
  expect(result).toEqual(new Date("2018-01-01"));
});

it("returns the first payment date when given a row where the date is different to the start date's date", () => {
  const thisFrequencyExtractor = createFrequencyExtractor("monthly");
  const row = { paymentDate: "3rd" };
  const result = thisFrequencyExtractor.getFirstPaymentDate(
    row,
    new Date("2018-01-01")
  );
  expect(result).toEqual(new Date("2018-01-03"));
});
