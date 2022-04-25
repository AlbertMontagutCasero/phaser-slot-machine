export const OptionId = {
  seven: "7",
  cherry: "cherry",
  bell: "bell",
  bar: "bar",
};

export function getOptionIdIndex(optionId) {
  return getOptionIdAsArray().findIndex(([key]) => OptionId[key] === optionId);
}

export function getOptionIdAsArray() {
  return Object.entries(OptionId);
}

export function getOptionIdAmount() {
  return getOptionIdAsArray().length;
}