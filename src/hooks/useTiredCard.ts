import useLocalStorage from "./useLocalStorage";

export enum TiredCard {
  Coffee = "☕️",
  Sleepy = "😴"
}

export const tiredCardDescriptions = {
  [TiredCard.Coffee]: "Coffee",
  [TiredCard.Sleepy]: "Sleepy"
};

type TiredCardHook = [TiredCard, (newTiredCard: TiredCard) => void];

function useTiredCard(): TiredCardHook {
  const [value, setValue] = useLocalStorage(
    "scrumpoker-tired-card-value",
    TiredCard.Coffee
  );
  return [value as TiredCard, setValue];
}

export default useTiredCard;
