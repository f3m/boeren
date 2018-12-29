export class Extractor {
  criteria = "";
  trigger = "";

  applies = rawRow => {
    return rawRow[this.criteria] === this.trigger;
  };

  transform(parameters, rawRow, startDate, allRows, transformedRows) {
    return rawRow;
  }
}
