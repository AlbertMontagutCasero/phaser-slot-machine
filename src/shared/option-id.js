export const OptionId = {
  seven: "7",
  cherry: "cherry",
  bell: "bell",
  bar: "bar",
};

export function getOptionIdIndex(optionId){
  return Object.keys(OptionId).findIndex(option => OptionId[option] === optionId);
}