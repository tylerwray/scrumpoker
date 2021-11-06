import useLocalStorage from "./useLocalStorage";

export enum IDontKnowCard {
  WomanShrugging = "🤷‍♀️",
  ManShrugging = "🤷‍♂️"
}

export const iDontKnowCardDescriptions = {
  [IDontKnowCard.WomanShrugging]: "Woman Shrugging",
  [IDontKnowCard.ManShrugging]: "Man Shrugging"
};

type CardSequenceHook = [
  IDontKnowCard,
  (newIDontKnowCard: IDontKnowCard) => void
];

function useCardColor(): CardSequenceHook {
  const [value, setValue] = useLocalStorage(
    "scrumpoker-i-dont-know-card-value",
    IDontKnowCard.WomanShrugging
  );

  return [value as IDontKnowCard, setValue];
}

export default useCardColor;
