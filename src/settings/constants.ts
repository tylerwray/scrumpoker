import { CardColor, CardSequence, IDontKnowCard, TiredCard } from "./types";

export const cardColorDescriptions = {
  [CardColor.Black]: "Black",
  [CardColor.Gray]: "Gray",
  [CardColor.Red]: "Red",
  [CardColor.Yellow]: "Yellow",
  [CardColor.Green]: "Green",
  [CardColor.Blue]: "Blue",
  [CardColor.Indigo]: "Indigo",
  [CardColor.Purple]: "Purple",
  [CardColor.Pink]: "Pink",
};

export const cardSequenceDescriptions = {
  [CardSequence.Fibonacci]: "Fibonacci",
  [CardSequence.TShirtSize]: "T-Shirt Sizes",
  [CardSequence.Standard]: "Standard",
};

export const iDontKnowCardDescriptions = {
  [IDontKnowCard.WomanShrugging]: "Woman Shrugging",
  [IDontKnowCard.ManShrugging]: "Man Shrugging",
};

export const tiredCardDescriptions = {
  [TiredCard.Coffee]: "Coffee",
  [TiredCard.Sleepy]: "Sleepy",
};
