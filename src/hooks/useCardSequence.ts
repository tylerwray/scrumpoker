import useLocalStorage from "./useLocalStorage";

export enum CardSequence {
  Fibonacci = "0, 1, 2, 3, 5, 8, 13, 21, 34, 89, 144",
  TShirtSize = "XS, S, M, L, XL",
  Standard = "0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10"
}

export function sequenceToArray(sequence: CardSequence) {
  return sequence.split(", ");
}

export const cardSequenceDescriptions = {
  [CardSequence.Fibonacci]: "Fibonacci",
  [CardSequence.TShirtSize]: "T-Shirt Sizes",
  [CardSequence.Standard]: "Standard"
};

type CardSequenceHook = [CardSequence, (newValue: CardSequence) => void];

function useCardSequence(): CardSequenceHook {
  const [value, setValue] = useLocalStorage(
    "scrumpoker-sequence",
    CardSequence.Fibonacci
  );

  return [value as CardSequence, setValue];
}

export default useCardSequence;
