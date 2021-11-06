import { useState } from "react";
import { CardColor, CardSequence, IDontKnowCard, TiredCard } from "./types";

type SetterFunc<Value = string> = (newValue: Value) => void;

function useLocalStorage<T = string>(
  key: string,
  initialValue: T
): [T, SetterFunc<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      const storageValue = item as unknown as T;

      return storageValue ? storageValue : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function setValue(value: T) {
    try {
      setStoredValue(value);
      const storageValue = value as unknown as string;
      window.localStorage.setItem(key, storageValue);
    } catch (error) {
      // Supress window is not defined error
    }
  }

  return [storedValue, setValue];
}

type SettingsHook = {
  cardColor: CardColor;
  setCardColor: SetterFunc<CardColor>;
  cardSequence: CardSequence;
  setCardSequence: SetterFunc<CardSequence>;
  iDontKnowCard: IDontKnowCard;
  setIDontKnowCard: SetterFunc<IDontKnowCard>;
  tiredCard: TiredCard;
  setTiredCard: SetterFunc<TiredCard>;
  sequenceToArray;
};

export function useSettings(): SettingsHook {
  const [cardColor, setCardColor] = useLocalStorage<CardColor>(
    "scrumpoker-card-color",
    CardColor.Red
  );

  const [cardSequence, setCardSequence] = useLocalStorage<CardSequence>(
    "scrumpoker-sequence",
    CardSequence.Fibonacci
  );

  const [iDontKnowCard, setIDontKnowCard] = useLocalStorage<IDontKnowCard>(
    "scrumpoker-i-dont-know-card-value",
    IDontKnowCard.WomanShrugging
  );

  const [tiredCard, setTiredCard] = useLocalStorage<TiredCard>(
    "scrumpoker-tired-card-value",
    TiredCard.Coffee
  );

  function sequenceToArray(sequence: CardSequence) {
    return sequence.split(", ");
  }

  return {
    cardColor,
    setCardColor,
    cardSequence,
    setCardSequence,
    iDontKnowCard,
    setIDontKnowCard,
    tiredCard,
    setTiredCard,
    sequenceToArray,
  };
}
