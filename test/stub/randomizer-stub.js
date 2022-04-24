export class RandomizerStub {
  constructor(valuesToReturn) {
    this.valuesToReturn = valuesToReturn;
    this.currentValueToReturnIndex = 0;
  }

  getRandomFloatBetween(minInclusive, max) {
    const result = this.valuesToReturn[this.currentValueToReturnIndex];
    this.currentValueToReturnIndex++;
    return result;
  }

  getRandomIntBetween(min, max) {
    const result = this.valuesToReturn[this.currentValueToReturnIndex];
    this.currentValueToReturnIndex++;
    return result;
  }
}