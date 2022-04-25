import {getOptionIdAmount, getOptionIdAsArray, getOptionIdIndex} from "../shared/option-id";

export class RailViewMotor {

  constructor() {
    this.startY = -70;
    this.numberOfOptions = getOptionIdAmount() * 3;

    this.options = this.createStartOptions();
  }

  createStartOptions() {
    const options = [];

    const optionIds = getOptionIdAsArray();
    for (let i = 0; i < this.numberOfOptions; i++) {
      const yPosition = this.startY + this.getDisplacementPixelsByPosition(i);
      const [optionIdKey] = optionIds[i % getOptionIdAmount()];
      options.push({yPosition: yPosition, optionId: optionIdKey});
    }

    return options;
  }

  getStartOptions() {
    return this.options;
  }

  moveOption(option, amountOfPixels) {
    let expectedPosition = option.y - amountOfPixels;
    while (expectedPosition < this.startY) {
      expectedPosition += this.getDisplacementPixelsByPosition(this.numberOfOptions);
    }
    option.y = expectedPosition;
  }

  getDisplacementPixelsByPosition(positionsNum) {
    const spaceBetweenItems = 120;

    return positionsNum * spaceBetweenItems;
  }

  getDistancePixelsAndTimeToReach(currentOption, destinationOption, pixelsPerSecondSpeed) {
    const positionsToMove = (destinationOption - currentOption) + getOptionIdAmount();
    const pixelsToMove = this.getDisplacementPixelsByPosition(positionsToMove);

    const timeToReachMs = (pixelsToMove / pixelsPerSecondSpeed) * 1000;
    return {timeToReachMs: timeToReachMs, distancePixelsMs: pixelsToMove};
  }

  getRailPosition(optionId) {
    return getOptionIdIndex(optionId) + getOptionIdAmount();
  }
}