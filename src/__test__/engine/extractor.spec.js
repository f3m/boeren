import Engine from "../../engine/engine";
import { createExtractor } from "../../engine/extractor";

const exampleMonthly = [
  {
    type: "Payment Type 1",
    payee: "Receiver 1",
    purpose: "A monthly payable cost",
    frequency: "monthly",
    payment_date: "5th",
    position: null,
    description: "a monthly test cost of 500",
    amount: "-500",
    precision: "actual",
    final_payment: "n/a"
  }
];

const exampleWeekly = [
  {
    type: "Payment Type 2",
    payee: "Receiver 2",
    purpose: "A weekly payable cost",
    frequency: "weekly",
    payment_date: "7th",
    position: null,
    description: "a weeky test cost of 100",
    amount: "-100",
    precision: "actual",
    final_payment: "n/a"
  }
];

const exampleQuarterly = [
  {
    type: "Payment Type 3",
    payee: "Receiver 3",
    purpose: "A quarterly payable cost",
    frequency: "monthly",
    payment_date: "9th",
    position: null,
    description: "a quarterly test cost of 300",
    amount: "-300",
    precision: "actual",
    final_payment: "n/a"
  }
];

const exampleOneOff = [
  {
    type: "Payment Type 4",
    payee: "Receiver 4",
    purpose: "A one-off payable cost",
    frequency: "one-off",
    payment_date: "11th",
    position: null,
    description: "a one-off test cost of 5000",
    amount: "-5000",
    precision: "actual",
    final_payment: "n/a"
  }
];

const exampleAnnual = [
  {
    type: "Payment Type 5",
    payee: "Receiver 5",
    purpose: "An anual payable cost",
    frequency: "one-off",
    payment_date: "13.7.",
    position: null,
    description: "a one-off test cost of 5000",
    amount: "-5000",
    precision: "actual",
    final_payment: "n/a"
  }
];

describe("the MonthlyExtractor class", () => {
  let engine = new Engine(exampleMonthly);
  let monthlyExtractor = createExtractor("monthly", new Date());
  engine.addExtractor(monthlyExtractor);

  it("returns 12 rows when given one monthly row", () => {
    let result = engine.run();
    expect(result.length).toEqual(12);
  });
});
