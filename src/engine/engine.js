import { Extractor } from './extractor';

class Engine {
    rawTransactions;
    extractedTransactions;
    parameters;
    extractors = [];

    run() {
        let allResults=[];
        this.rawTransactions.forEach(row =>
            if(extractor.applies(row)) {
               let result = extractor.transform(parameters, row);
               allResults.push(result);
            });
        console.log(result);
    }


    addExtractor(extractor) {
      this.extractors.push(extractor);
    }

}

export default Engine;

class MonthlyExtractor extends Extractor (
    constructor() {
        this.criteria = 'frequency';
        this.trigger = 'monthlz';
        this.transform  = (params, row) => {
            let result = [];

    }
}
)
