var moment = require('moment');
require('moment-recur');

class Extractor {
  criteria;
  trigger;

  applies = (rawRow) => {
    return rawRow[criteria] == trigger;
  }

  transform(parameters, rawRow, allRows, transformedRows) {
    return rawRow;
  }
}

class DefaultFrequencyExtractor extends Extractor {
  criteria="frequency";
  durationDays=365;
  durationDivision = 1;
  startDate = new Date();

  getNextRelevantDate = (offset) => {
    return null;
  }

  transform(parameters, rawRow, allRows, transformedRows) {
      let repeater = this.durationDays / this.durationDivision;
      let currentDate = this.startDate;
      for(let i=0; i<repeater; i++) {

      }
  }
}


export default Extractor;
