import React, { useCallback } from "react";
import { ReactNode, createContext, useMemo, useContext, useState } from "react";
import { useColorMode } from "@chakra-ui/react";
import {
  CardColor,
  CardSequence,
  presetCardColors,
  presetCardSequences,
} from "./constants";

type SetterFunc<Value = string> = (newValue: Value) => void;

type LocalStorageArgs<T> = {
  key: string;
  defaultValue?: T;
};

function useLocalStorage<T = string>({
  key,
  defaultValue,
}: LocalStorageArgs<T>): [T, SetterFunc<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const storageValue = window.localStorage.getItem(key);
      return storageValue ? JSON.parse(storageValue) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  function setValue(value: T) {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("error?", error);
      // Supress window is not defined error
    }
  }

  return [storedValue, setValue];
}

type Settings = {
  cardColor: CardColor;
  cardSequence: CardSequence;
  cards: string[];
  iDontKnowCard: string;
  tiredCard: string;
  setCardColor: SetterFunc<CardColor>;
  setCardSequence: SetterFunc<CardSequence>;
  setIDontKnowCard: SetterFunc<string>;
  setTiredCard: SetterFunc<string>;
};

const SettingsContext = createContext<Settings | undefined>(undefined);

type SettingsProviderProps = {
  children: ReactNode;
};

function SettingsProvider({ children }: SettingsProviderProps) {
  const [cardColor, setCardColor] = useLocalStorage<CardColor>({
    key: "scrumpoker-card-color-name",
    defaultValue: presetCardColors[0],
  });

  const [cardSequence, setCardSequence] = useLocalStorage<CardSequence>({
    key: "scrumpoker-sequence-name",
    defaultValue: presetCardSequences[0],
  });

  const [iDontKnowCard, setIDontKnowCard] = useLocalStorage({
    key: "scrumpoker-i-dont-know-card",
    defaultValue: "🤷‍♀️",
  });

  const [tiredCard, setTiredCard] = useLocalStorage({
    key: "scrumpoker-tired-card",
    defaultValue: "🥱",
  });

  const cards = cardSequence.values.concat([iDontKnowCard, tiredCard]);

  const value = useMemo<Settings>(
    () => ({
      cardColor,
      cardSequence,
      cards,
      iDontKnowCard,
      tiredCard,
      setCardColor,
      setCardSequence,
      setIDontKnowCard,
      setTiredCard,
    }),
    [
      cardColor,
      cardSequence,
      cards,
      iDontKnowCard,
      tiredCard,
      setCardColor,
      setCardSequence,
      setIDontKnowCard,
      setTiredCard,
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
