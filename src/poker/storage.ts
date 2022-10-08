import { useState } from "react";

const CODE_KEY = "scrum_poker_game_code";
const NAME_KEY = "scrum_poker_game_name";
const PLAYER_ID_KEY = "scrum_poker_player_id";
const TOKEN_KEY = "scrum_poker_token";

function getCode() {
  return localStorage.getItem(CODE_KEY);
}

function setCode(code: string) {
  localStorage.setItem(CODE_KEY, code);
}

function useCode() {
  const [code, setCode] = useLocalStorage(CODE_KEY);

  function generateNewCode() {
    setCode(generateCode());
  }

  return { code, generateNewCode };
}

function getName() {
  return localStorage.getItem(NAME_KEY);
}

function setName(name: string) {
  localStorage.setItem(NAME_KEY, name);
}

function useName() {
  const [name, setName] = useLocalStorage(NAME_KEY);

  if (!name) {
    let newName = `Anonymous ${randomAnmial()}`;
    setName(newName);
    return { name: newName };
  }

  return { name };
}

function getPlayerId() {
  return localStorage.getItem(PLAYER_ID_KEY);
}

function setPlayerId(playerId: string) {
  localStorage.setItem(PLAYER_ID_KEY, playerId);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export const storage = {
  getCode,
  setCode,
  useCode,
  getName,
  setName,
  useName,
  getPlayerId,
  setPlayerId,
  getToken,
  setToken,
};

function useLocalStorage(key: string): [string | null, (x: string) => void] {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, value);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function generateCode() {
  let code = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  for (let i = 0; i < 4; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}

function randomAnmial() {
  const animals = [
    "Sloth",
    "Rat",
    "Wombat",
    "Aardvark",
    "Shark",
    "Elephant",
    "Sheep",
    "Lion",
    "Bear",
    "BlueBird",
    "Pigeon",
    "Cheetah",
    "Hawk",
    "Horse",
    "Dog",
    "Kitten",
    "Pig",
  ];

  const randomIndex = Math.floor(Math.random() * animals.length);

  return animals[randomIndex];
}
