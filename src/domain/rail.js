import {OptionId} from "../shared/option-id";

export class Rail {

  /**
   *
   * @param {Randomizer} randomizer
   */
  constructor(randomizer) {
    this.randomProvider = randomizer;
    this.possibleOptions = [OptionId.seven, OptionId.cherry, OptionId.bell, OptionId.bar];
    this.currentOption = 0;
  }

  getNumberOfPossibleOptions() {
    return this.possibleOptions.length;
  }

  generateOption() {
    this.currentOption = this.randomProvider.getRandomIntBetween(0, this.getNumberOfPossibleOptions() - 1);
  }

  getOption() {
    return this.possibleOptions[this.currentOption];
  }
}