export default class Extractor {
  enabled = true;
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
