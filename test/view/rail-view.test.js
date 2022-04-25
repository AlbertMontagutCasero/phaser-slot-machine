import {getOptionIdAsArray, OptionId} from "../../src/shared/option-id";
import {RailViewMotor} from "../../src/view/rail-view.motor";

describe("rail view test", () => {
  test("when get start options the positions should be the expected ones", () => {
    const sut = new RailViewMotor();

    const result = sut.getStartOptions().map(option => option.yPosition);

    const expectedResult = [-70, 50, 170, 290, 410, 530, 650, 770, 890, 1010, 1130, 1250];
    expect(result).toStrictEqual(expectedResult);
  });


  test("when get start options the ids should be the expected ones and in the correct order", () => {
    const sut = new RailViewMotor();

    const result = sut.getStartOptions().map(option => option.optionId);

    const optionsKeys = getOptionIdAsArray().map(([key]) => key);
    const expectedResult = repeatArray(optionsKeys, 3);
    expect(result).toStrictEqual(expectedResult);
  });

  test("given option when move above first position then the position should be the last one", () => {
    const sut = new RailViewMotor();

    const firstPosition = -70;
    const optionStub = {y: firstPosition};
    sut.moveOption(optionStub, 1);

    const lastPosition = 1370;
    expect(optionStub.y).toBe(lastPosition - 1);
  });

  test.each([[OptionId.seven, 4], [OptionId.cherry, 5], [OptionId.bell, 6], [OptionId.bar, 7],])("given option id %p when get next rail position should be %p (the correct position on the central group)", (optionId, expectedResult) => {
    const sut = new RailViewMotor();

    const result = sut.getRailPosition(optionId);

    expect(result).toBe(expectedResult);
  });

  test.each([{
    currentOption: OptionId.seven,
    destinationOption: OptionId.seven,
    expectedDistance: 480
  }, {
    currentOption: OptionId.bar,
    destinationOption: OptionId.bar,
    expectedDistance: 480
  }, {
    currentOption: OptionId.bar,
    destinationOption: OptionId.seven,
    expectedDistance: 120
  }])("given current $currentOption and destination $destinationOption" +
    " options when getDistancePixelsAndTimeToReach distance should be $expectedDistance",
  ({
    currentOption, destinationOption, expectedDistance
  }) => {
    const sut = new RailViewMotor();
    const currentRailPosition = sut.getRailPosition(currentOption);
    const destinationRailPosition = sut.getRailPosition(destinationOption);
    const onePositionPerSecondSpeed = 120;

    const {distancePixelsMs} = sut.getDistancePixelsAndTimeToReach(currentRailPosition,
      destinationRailPosition,
      onePositionPerSecondSpeed);

    expect(distancePixelsMs).toBe(expectedDistance);
  });

  test.each([{
    currentOption: OptionId.seven,
    destinationOption: OptionId.seven,
    expectedTimeMs: 4000
  }, {
    currentOption: OptionId.bar,
    destinationOption: OptionId.bar,
    expectedTimeMs: 4000
  }, {
    currentOption: OptionId.bar,
    destinationOption: OptionId.seven,
    expectedTimeMs: 1000
  }])("given current $currentOption and destination $destinationOption" +
    " options when getDistancePixelsAndTimeToReach timeMs should be $expectedTimeMs",
  ({
    currentOption, destinationOption, expectedTimeMs
  }) => {
    const sut = new RailViewMotor();
    const currentRailPosition = sut.getRailPosition(currentOption);
    const destinationRailPosition = sut.getRailPosition(destinationOption);
    const onePositionPerSecondSpeed = 120;

    const {timeToReachMs} = sut.getDistancePixelsAndTimeToReach(currentRailPosition,
      destinationRailPosition,
      onePositionPerSecondSpeed);

    expect(timeToReachMs).toBe(expectedTimeMs);
  });
});

export function repeatArray(array, times) {
  const newArray = [];
  for (let i = 0; i < times; i++) {
    newArray.push(...array);
  }
  return newArray;
}