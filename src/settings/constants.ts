import { CardColor, CardSequence, IDontKnowCard, TiredCard } from "./types";

export type CardColorMix = {
  front: string;
  back: string;
};

type CardColorBackgrounds = {
  dark: {
    [key in CardColor]: CardColorMix;
  };
  light: {
    [key in CardColor]: CardColorMix;
  };
};

export const cardColorBackgrounds: CardColorBackgrounds = {
  dark: {
    [CardColor.Black]: { front: "black", back: "black" },
    [CardColor.Gray]: { front: "gray.600", back: "gray.600" },
    [CardColor.Red]: { front: "red.700", back: "red.700" },
    [CardColor.Yellow]: { front: "yellow.600", back: "yellow.600" },
    [CardColor.Green]: { front: "green.700", back: "green.700" },
    [CardColor.Blue]: { front: "blue.700", back: "blue.700" },
    [CardColor.Purple]: { front: "purple.700", back: "purple.700" },
    [CardColor.Pink]: { front: "pink.600", back: "pink.600" },
    [CardColor.Gradient]: {
      front: "linear(to-r, pink.600, purple.700)",
      back: "linear(to-l, pink.600, purple.700)",
    },
  },
  light: {
    [CardColor.Black]: { front: "black", back: "black" },
    [CardColor.Gray]: { front: "gray.600", back: "gray.600" },
    [CardColor.Red]: { front: "red.500", back: "red.500" },
    [CardColor.Yellow]: { front: "yellow.400", back: "yellow.400" },
    [CardColor.Green]: { front: "green.500", back: "green.500" },
    [CardColor.Blue]: { front: "blue.500", back: "blue.500" },
    [CardColor.Purple]: { front: "purple.500", back: "purple.500" },
    [CardColor.Pink]: { front: "pink.300", back: "pink.300" },
    [CardColor.Gradient]: {
      front: "radial(green.500, pink.300)",
      back: "radial(green.500, pink.300)",
    },
  },
};

type CardColorMap = {
  [key in CardColor]: string;
};

export const cardColorDescriptions: CardColorMap = {
  [CardColor.Black]: "Black",
  [CardColor.Gray]: "Gray",
  [CardColor.Red]: "Red",
  [CardColor.Yellow]: "Yellow",
  [CardColor.Green]: "Green",
  [CardColor.Blue]: "Blue",
  [CardColor.Purple]: "Purple",
  [CardColor.Pink]: "Pink",
  [CardColor.Gradient]: "Gradient",
};

type CardSequenceMap = {
  [key in CardSequence]: string;
};

export const cardSequenceDescriptions: CardSequenceMap = {
  [CardSequence.Fibonacci]: "Fibonacci",
  [CardSequence.TShirtSize]: "T-Shirt Sizes",
  [CardSequence.Standard]: "Standard",
};

type IDontKnowCardMap = {
  [key in IDontKnowCard]: string;
};

export const iDontKnowCardDescriptions: IDontKnowCardMap = {
  [IDontKnowCard.WomanShrugging]: "Woman Shrugging",
  [IDontKnowCard.ManShrugging]: "Man Shrugging",
};

type TiredCardMap = {
  [key in TiredCard]: string;
};

export const tiredCardDescriptions: TiredCardMap = {
  [TiredCard.Coffee]: "Coffee",
  [TiredCard.Sleepy]: "Sleepy",
};
