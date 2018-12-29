export default class Extractor {
  criteria = "";
  trigger = "";

  constructor(name) {
    this.name = name;
  }

  applies = rawRow => {
    return rawRow[this.criteria] === this.trigger;
  };

  transform(parameters, rawRow, startDate, allRows, transformedRows) {
    return rawRow;
  }
}
