import createFrequencyExtractor from "./extractor";
import { Engine } from "./engine";

export class DefaultEngine extends Engine {
  constructor(rawTransactions) {
    super(rawTransactions);
    this.addExtractor(createFrequencyExtractor("monthly"));
    this.addExtractor(createFrequencyExtractor("weekly"));
    this.addExtractor(createFrequencyExtractor("quarterly"));
    this.addExtractor(createFrequencyExtractor("annual"));
    this.addExtractor(createFrequencyExtractor("one-off"));
  }
}
