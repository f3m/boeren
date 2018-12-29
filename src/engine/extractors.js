const moment = require('moment');
require('moment-recur');

///////  BASE STUFF ///////////////

class Extractor {
  criteria="";
  trigger="";

  applies = (rawRow) => {
    return rawRow[criteria] == trigger;
  }

  transform(parameters, rawRow, allRows, transformedRows) {
    return rawRow;
  }
}


class DefaultFrequencyExtractor extends Extractor {
  criteria = "frequency";
  numberOfRepeats = -1;
  startDate = new Date();

  getDateSeries = (paymentDate, numberOf) => {
    return null;
  }

  transform(parameters, rawRow, allRows, transformedRows) {
    let paymentDate = new Date(rawRow['payment_date']);
    let dates = this.getDateSeries(paymentDate, this.numberOfRepeats);
    if (dates != null && dates.length > 0) {
      return dates.map(date => {
        let newRow = {...rawRow};
        newRow['payment_date'] = date;
        return newRow;
      })
    }
    return null;
  }
}

class WeeklyExtractor extends DefaultFrequencyExtractor {
  trigger = "weekly";
  numberOfRepeats = 52;
  getDateSeries = (paymentDate, numberOf) => moment(this.startDate).recur().every(1).weeks();
}

class MonthlyExtractor extends DefaultFrequencyExtractor {
  trigger = "monthly";
  numberOfRepeats = 12;
  getDateSeries = (paymentDate, numberOf) => moment(this.startDate).recur().every(1).months();
}

class QuarterlyExtractor extends DefaultFrequencyExtractor {
  trigger = "quarterly";
  numberOfRepeats = 4;
  getDateSeries = (paymentDate, numberOf) => moment(this.startDate).recur().every(3).months();
}

class AnnualExtractor extends DefaultFrequencyExtractor {
  trigger = "annual";
  numberOfRepeats = 1;
  getDateSeries = (paymentDate, numberOf) => moment(this.startDate).recur().every(1).year();
}

class OneOffExtractor extends DefaultFrequencyExtractor {
  trigger = "one-off";
  numberOfRepeats = 1;
  getDateSeries = (paymentDate, numberOfRepeats) => {
    let endDate = moment(this.startDate).add(365, 'days');
    if (paymentDate > this.startDate && paymentDate < endDate) {
      return [paymentDate];
    }
    return null;
  }
}




export default Extractor;
