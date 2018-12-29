const moment = require('moment');
require('moment-recur');

///////  BASE STUFF ///////////////

export class Extractor {
  criteria = "";
  trigger = "";

  applies = (rawRow) => {
    return rawRow[this.criteria] == this.trigger;
  }

  transform(parameters, rawRow, startDate, allRows, transformedRows) {
    return rawRow;
  }
}


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

  getFirstPaymentDate = (row) => {
    let dayString = row['payment_date'];
    let day = (!dayString) ? 1 : Number(dayString.match('\d+'));
    return moment(this.startDate).date(day);
  }

  transform(parameters, rawRow, startDate, allRows, transformedRows) {
    let firstPaymentDate = this.getFirstPaymentDate(rawRow);
    let dates = this.getDateSeries(this.paymentDate, this.numberOfRepeats);
    if (dates != null) {
      return dates.next(this.numberOfRepeats).map(date => {
        let newRow = {...rawRow};
        newRow['payment_date'] = date;
        return newRow;
      })
    }
    return null;
  }
}

export const createExractor = (frequency, startDate) => {
  switch (frequency) {
    case "weekly":
      return new DefaultFrequencyExtractor(frequency, 52, (paymentDate, numberOf) => moment(startDate).recur().every(1).weeks());
    case "monthly":
      return new DefaultFrequencyExtractor(frequency, 12, (paymentDate, numberOf) => moment(startDate).recur().every(1).months());
    case "quarterly":
      return new DefaultFrequencyExtractor(frequency, 4, (paymentDate, numberOf) => moment(startDate).recur().every(3).months());
    case "annual":
      return new DefaultFrequencyExtractor(frequency, 1, (paymentDate, numberOf) => moment(startDate).recur().every(1).year());
    case "one-off":
      return new DefaultFrequencyExtractor(frequency, 1, (paymentDate, numberOfRepeats) => {
        let endDate = moment(startDate).add(365, 'days');
        if (paymentDate > this.startDate && paymentDate < endDate) {
          return [paymentDate];
        }
        return null;
      })
  }
}


