import {Rail} from "./rail";

export class SlotMachine {
  constructor(randomProvider) {
    this.numOfRails = 3;
    this.rails = this.getRails(randomProvider);
  }

  /**
   * @return Rail[]
   */
  getRails(randomProvider) {
    let rails = [];
    for (let i = 0; i < this.numOfRails; i++) {
      rails.push(new Rail(randomProvider));
    }
    return rails;
  }

  getCombination() {
    return this.rails.map(rail => {
      rail.generateOption();
      return rail.getOption();
    });
  }
}