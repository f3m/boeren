import createExractor from "./extractors";
import {Engine} from "./engine";

export class DefaultEngine extends Engine {
  constructor(rawTransactions) {
    super(rawTransactions);
    this.addExtractor(createExractor("monthly"));
    this.addExtractor(createExractor("weekly"));
    this.addExtractor(createExractor("quarterly"));
    this.addExtractor(createExractor("annual"));
    this.addExtractor(createExractor("one-off"));

  }
}
