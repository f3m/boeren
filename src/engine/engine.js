import { Extractor } from './extractor';

class Engine {
    let rawTransactions;
    let extractedTransactions;
    let parameters;
    let extractors = [];

    run() {
        let allResults;
        this.rawTransactions.forEach(row =>
            let results;
            if(extractor.applies(row)) {
               result = extractor.transform(parameters, row);
               allResults.push(result);
            }
        )
        console.log(result);
    }
}

export class Engine;

class MonthlyExtractor extends Extractor (
    constructor() {
        this.criteria = 'frequency';
        this.trigger = 'monthlz';
        this.transform  = (params, row) => {
            let result = [];

    }
}
)