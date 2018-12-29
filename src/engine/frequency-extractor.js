import { Extractor } from "./extractor";
const moment = require("moment");
require("moment-recur");

class DefaultFrequencyExtractor extends Extractor {
  criteria = "frequency";
  numberOfRepeats = -1;

  constructor(trigger, numberOfRepeats, getDateSeries) {
    super();
    this.trigger = trigger;
    this.numberOfRepeats = numberOfRepeats;
    this.getDateSeries = getDateSeries;
  }

  getDateSeries = (paymentDate, numberOf) => {
    return null;
  };

  //todo override this in the weekl and other extractors or keep it emptz here
  getFirstPaymentDate = row => {
    let dayString = row["payment_date"];
    let day = !dayString ? 1 : Number(dayString.match(/\d+/)[0]);
    return moment(this.startDate)
      .date(day)
      .toDate();
  };

  transform(parameters, rawRow, startDate, allRows, transformedRows) {
    let firstPaymentDateStr = JSON.stringify(
      this.getFirstPaymentDate(rawRow)
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
          newRow["payment_date"] = date;
          return newRow;
        });
    }
    return null;
  }
}

export const createFrequencyExtractor = (frequency, startDate) => {
  switch (frequency) {
    case "weekly":
      return new DefaultFrequencyExtractor(
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
        frequency,
        1,
        (paymentDate, numberOfRepeats) => {
          let endDate = moment(startDate).add(365, "days");
          if (paymentDate > this.startDate && paymentDate < endDate) {
            return [paymentDate];
          }
          return null;
        }
      );
  }
};
