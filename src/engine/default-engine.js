import createExtractor from "./extractor";
import { Engine } from "./engine";

export class DefaultEngine extends Engine {
  constructor(rawTransactions) {
    super(rawTransactions);
    this.addExtractor(createExtractor("monthly"));
    this.addExtractor(createExtractor("weekly"));
    this.addExtractor(createExtractor("quarterly"));
    this.addExtractor(createExtractor("annual"));
    this.addExtractor(createExtractor("one-off"));
  }
}
