import { LetterStatus } from "../../types";
import allNames from "../data/names";
import { LOCAL_STORAGE_KEY } from "../constants";

export function checkGuess(guess: string[], secretWord: string) {
  const secretWordCharCount = secretWord.split("").reduce((acc, curr) => {
    if (Object.hasOwnProperty.call(acc, curr)) {
      acc[curr] += 1;
    } else {
      acc[curr] = 1;
    }
    return acc;
  }, {} as { [key: string]: number });
  const checkedGuess = guess.map((letter: string, i: number) => {
    let status;

    if (secretWord[i] === letter) {
      status = LetterStatus.GREEN;
      secretWordCharCount[letter] -= 1;
    } else if (secretWordCharCount[letter]) {
      status = LetterStatus.YELLOW;
      secretWordCharCount[letter] -= 1;
    } else {
      status = LetterStatus.GRAY;
    }

    return {
      letter,
      status,
    };
  });

  return {
    guess,
    checkedGuess,
    isCorrect: checkedGuess.every((ls) => ls.status === LetterStatus.GREEN),
  };
}

export function getBaseCharClasses() {
  return "border-2 w-16 h-16 m-1 flex justify-center items-center";
}

export function getCharClassesByStatus(status: LetterStatus) {
  switch (status) {
    case LetterStatus.GREEN:
      return "bg-green-600";
    case LetterStatus.GRAY:
      return "bg-gray-500";
    case LetterStatus.YELLOW:
      return "bg-yellow-400";
    default:
      return "";
  }
}

export const isToday = (someDateStr: string) => {
  const someDate = new Date(someDateStr);
  const today = new Date();
  return (
    someDate.getDate() === today.getDate() &&
    someDate.getMonth() === today.getMonth() &&
    someDate.getFullYear() === today.getFullYear()
  );
};

export const getUsedNames = () => {
  try {
    const usedNamesData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (usedNamesData) {
      const usedNames = JSON.parse(usedNamesData);
      return usedNames;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getCurrentName = () => {
  const usedNames = getUsedNames();
  return usedNames.find((un: { name: string; date: string }) =>
    isToday(un.date)
  );
};

export const recordRandomName = (nameToRecord: string) => {
  const usedNames = getUsedNames();
  const data = JSON.stringify(
    [
      ...usedNames,
      {
        name: nameToRecord,
        date: new Date().toUTCString(),
      },
    ],
    null,
    2
  );

  localStorage.setItem(LOCAL_STORAGE_KEY, data);
};

export const getRandomName = (): string => {
  const usedNames = getUsedNames();
  if (!allNames.length) {
    throw Error("Out of names");
  }
  const randomName = allNames[Math.floor(Math.random() * allNames.length)];
  if (!usedNames.includes(randomName)) {
    return randomName;
  }
  return getRandomName();
};
