import useLocalStorage from "./useLocalStorage";

export enum CardColor {
  Black = "bg-black",
  Gray = "bg-gray-800",
  Red = "bg-red-700",
  Yellow = "bg-yellow-600",
  Green = "bg-green-700",
  Blue = "bg-blue-700",
  Indigo = "bg-indigo-700",
  Purple = "bg-purple-700",
  Pink = "bg-pink-700"
}

export const cardColorDescriptions = {
  [CardColor.Black]: "Black",
  [CardColor.Gray]: "Gray",
  [CardColor.Red]: "Red",
  [CardColor.Yellow]: "Yellow",
  [CardColor.Green]: "Green",
  [CardColor.Blue]: "Blue",
  [CardColor.Indigo]: "Indigo",
  [CardColor.Purple]: "Purple",
  [CardColor.Pink]: "Pink"
};

type CardColorHook = [CardColor, (newColor: CardColor) => void];

function useCardColor(): CardColorHook {
  const [value, setValue] = useLocalStorage(
    "scrumpoker-card-color",
    CardColor.Red
  );
  return [value as CardColor, setValue];
}

export default useCardColor;
