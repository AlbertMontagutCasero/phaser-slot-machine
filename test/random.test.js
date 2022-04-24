import {Randomizer} from "../src/random/randomizer";

test("given min and max when get random float between min inclusive and max inclusive should return a number in this range", () => {
  const sut = new Randomizer();
  const min = -50.5;
  const max = 10.23;
  for (let i = 0; i < 1000; i++){
    let result = sut.getRandomFloatBetween(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThan(max);
    expect(result).not.toBe(max);
  }
});

test("given min and max when get random int between min inclusive and max inclusive should return a number in this range", () => {
  const sut = new Randomizer();
  const min = -25;
  const max = 34;
  for (let i = 0; i < 1000; i++){
    let result = sut.getRandomIntBetween(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  }
});