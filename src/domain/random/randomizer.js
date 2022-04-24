export class Randomizer {
  getRandomFloatBetween(minInclusive, max) {
    return Math.random() * (max - minInclusive) + minInclusive;
  }

  getRandomIntBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}