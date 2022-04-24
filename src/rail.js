export class Rail {

  /**
   *
   * @param {Randomizer} randomizer
   */
  constructor(randomizer) {
    this.randomProvider = randomizer;
    this.possibleOptions = ["7", "cherry", "bell", "bar"];
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