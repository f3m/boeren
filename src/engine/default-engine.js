import { createFrequencyExtractor } from "./frequency-extractor";
import Engine from "./engine";

export default class DefaultEngine extends Engine {
  constructor(rawTransactions) {
    super("DefaultEngine", rawTransactions);
    this.addExtractor(createFrequencyExtractor("monthly"));
    this.addExtractor(createFrequencyExtractor("weekly"));
    this.addExtractor(createFrequencyExtractor("quarterly"));
    this.addExtractor(createFrequencyExtractor("annual"));
    this.addExtractor(createFrequencyExtractor("one-off"));
  }
}
