import {Rail} from "../../src/domain/rail";
import {RandomizerStub} from "../stub/randomizer-stub";

describe("rail tests", ()=> {
  let cases = [
    {expectedValue: "7", randomStubValue: 0},
    {expectedValue: "cherry", randomStubValue: 1},
    {expectedValue: "bell", randomStubValue: 2},
    {expectedValue: "bar", randomStubValue: 3},
  ];
  test.each(cases)("given '$randomStubValue' index when get option after generate option should be '$expectedValue' ", ({expectedValue, randomStubValue}) => {
    // Arrange
    const sut = new Rail(new RandomizerStub([randomStubValue]));

    // Act
    sut.generateOption();
    const result = sut.getOption();

    // Assert
    expect(result).toBe(expectedValue);
  });
});
