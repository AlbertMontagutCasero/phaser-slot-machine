import {RandomizerStub} from "./stub/randomizer-stub";
import {SlotMachine} from "../src/slot-machine";

describe("combinations tests", () => {
  let cases = [
    [[0,0,0], ["7","7","7"]],
    [[0,0,1], ["7","7","cherry"]],
    [[3,3,3], ["bar","bar","bar"]],
  ];
  test.each(cases)("given random rail positions %p when get combination should return %p", (randomPositionByRail, expectedResult) => {
    const sut = new SlotMachine(new RandomizerStub(randomPositionByRail));
    const result = sut.getCombination();

    expect(result).toEqual(expectedResult);
  });
});
