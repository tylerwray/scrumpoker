import { useState } from "react";

type LazyFunc = (stored: string) => string;

function useLocalStorage(
  key: string,
  initialValue: string
): [string, (newValue: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  function setValue(value: string | LazyFunc) {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Supress window is not defined error
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;
