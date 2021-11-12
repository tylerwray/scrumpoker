import { ReactNode, createContext, useMemo, useContext, useState } from "react";
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
      console.error("error?", error);
      // Supress window is not defined error
    }
  }

  return [storedValue, setValue];
}

type Settings = {
  cards: string[];
  cardColor: CardColor;
  cardSequence: CardSequence;
  iDontKnowCard: IDontKnowCard;
  tiredCard: TiredCard;
  setCardColor: SetterFunc<CardColor>;
  setCardSequence: SetterFunc<CardSequence>;
  setIDontKnowCard: SetterFunc<IDontKnowCard>;
  setTiredCard: SetterFunc<TiredCard>;
};

function sequenceToArray(sequence: CardSequence) {
  return sequence.split(", ");
}

const SettingsContext = createContext<Settings | undefined>(undefined);

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
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

  const cards = sequenceToArray(cardSequence).concat([
    iDontKnowCard,
    tiredCard,
  ]);

  const value = useMemo<Settings>(
    () => ({
      cards,
      cardColor,
      setCardColor,
      cardSequence,
      setCardSequence,
      iDontKnowCard,
      setIDontKnowCard,
      tiredCard,
      setTiredCard,
      sequenceToArray,
    }),
    [
      cards,
      cardColor,
      setCardColor,
      cardSequence,
      setCardSequence,
      iDontKnowCard,
      setIDontKnowCard,
      tiredCard,
      setTiredCard,
      sequenceToArray,
    ]
  );

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings(): Settings {
  const settings = useContext(SettingsContext);

  if (settings === undefined) {
    throw new Error("useSettings must be used with a <SettingsProvider />");
  }

  return settings;
}

export { SettingsProvider, useSettings };
