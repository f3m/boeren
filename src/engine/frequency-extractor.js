import Extractor from "./extractor";
const moment = require("moment");
require("moment-recur");

class DefaultFrequencyExtractor extends Extractor {
  criteria = "frequency";
  numberOfRepeats = -1;

  constructor(name, trigger, numberOfRepeats, getDateSeries) {
    super(name);
    this.trigger = trigger;
    this.numberOfRepeats = numberOfRepeats;
    this.getDateSeries = getDateSeries;
  }

  getDateSeries = (paymentDate, numberOf) => {
    return null;
  };

  //todo override this in the weekl and other extractors or keep it emptz here
  getFirstPaymentDate = (row, startDate) => {
    let dayString = row["paymentDate"];
    let day = !dayString ? 1 : Number(dayString.match(/\d+/)[0]);
    return moment(startDate)
      .date(day)
      .toDate();
  };

  transform(parameters, rawRow, startDate, allRows, transformedRows) {
    let firstPaymentDateStr = JSON.stringify(
      this.getFirstPaymentDate(rawRow, startDate)
    ).substr(1, 10);
    let firstPaymentDate = new Date(firstPaymentDateStr);
    let finalPaymentStr = rawRow["finalPayment"];
    let finalPaymentDate = finalPaymentStr
      ? new Date(finalPaymentStr)
      : undefined;
    let dates = this.getDateSeries(firstPaymentDate, this.numberOfRepeats);
    if (dates != null) {
      return dates
        .filter(date => !finalPaymentDate || date.toDate() <= finalPaymentDate)
        .map(date => {
          let newRow = { ...rawRow };
          newRow["paymentDate"] = date;
          return newRow;
        });
    }
    return null;
  }
}

export const createFrequencyExtractor = frequency => {
  switch (frequency) {
    case "weekly":
      return new DefaultFrequencyExtractor(
        "WeeklyExtractor",
        frequency,
        52,
        (paymentDate, numberOf) =>
          moment(paymentDate)
            .recur()
            .every(1)
            .weeks()
            .next(numberOf)
      );
    case "monthly":
      return new DefaultFrequencyExtractor(
        "MonthlyExtractor",
        frequency,
        12,
        (paymentDate, numberOf) =>
          moment(paymentDate)
            .recur()
            .every(1)
            .months()
            .next(numberOf)
      );
    case "quarterly":
      return new DefaultFrequencyExtractor(
        "QuarterlyExtractor",
        frequency,
        4,
        (paymentDate, numberOf) =>
          moment(paymentDate)
            .recur()
            .every(3)
            .months()
            .next(numberOf)
      );
    case "annual":
      return new DefaultFrequencyExtractor(
        "AnnuallyExtractor",
        frequency,
        1,
        (paymentDate, numberOf) =>
          moment(paymentDate)
            .recur()
            .every(1)
            .year()
            .next(numberOf)
      );
    case "one-off":
      return new DefaultFrequencyExtractor(
        "OneOffExtractor",
        frequency,
        1,
        (paymentDate, numberOfRepeats) => {
          // todo one-off doesn't currently work, add tests and fix it
          let endDate = moment(new Date()).add(365, "days");
          if (paymentDate > this.startDate && paymentDate < endDate) {
            return [paymentDate];
          }
          return null;
        }
      );
    default:
      return null;
  }
};
