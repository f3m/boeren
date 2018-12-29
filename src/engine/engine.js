import createExtractor from "./extractor";

export default class Engine {
  rawTransactions;
  extractedTransactions = [];
  parameters = undefined;
  extractors = [];

  constructor(rawTransactions) {
    this.rawTransactions = rawTransactions;
  }

  run(startDate) {
    this.rawTransactions.forEach(row => {
      let result = [];
      console.log("=> Processing row:" + row);
      this.extractors.forEach(extractor => {
        console.log("==> Applying extractor:" + extractor);
        if (extractor.applies(row)) {
          result = extractor.transform(
            this.parameters,
            row,
            startDate,
            this.rawTransactions,
            this.allResults
          );
          result.forEach(row => this.extractedTransactions.push(row));
        }
      });
    });
    // console.log(this.extractedTransactions);
    return this.extractedTransactions;
  }

  addExtractor(extractor) {
    this.extractors.push(extractor);
  }
}
