import { Extractor } from './extractors';

class Engine {
    rawTransactions;
    extractedTransactions=[];
    parameters = undefined;
    extractors = [];

    run() {
        this.rawTransactions.forEach(row => {
          let result = [];
          console.log("=> Processing row:"+row);
          this.extractors.forEach(extractor => {
            console.log("==> Applying extractor:"+extractor);
            if(extractor.applies(row)) {
              result = extractor.transform(parameters, row, this.rawTransactions, allResults);
              result.forEach(row=>this.extractedTransactions.push(row));
            }});
          })

        console.log(this.extractedTransactions);
    }

    addExtractor(extractor) {
      this.extractors.push(extractor);
    }

    removeExtractor(extractor) {
      this.extractors = this.extractors.filter(e=>e!=extractor);
    }

}

export default Engine;
