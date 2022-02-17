import { LetterStatus, CheckedGuessState, GuessState } from "../../types";
import allowableNames from "../data/allowableNames";
import { LOCAL_STORAGE_KEY } from "../constants";
import allNames from "../data/names";

export function capitalize(word: string) {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1, word.length)}`;
}

export function validateName(guess: string[]) {
  return allNames.includes(capitalize(guess.join("")));
}

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
  return "border-2 text-3xl w-24 h-24 m-1 flex justify-center items-center";
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
  if (!allowableNames.length) {
    throw Error("Out of names");
  }
  const randomName =
    allowableNames[Math.floor(Math.random() * allowableNames.length)];
  if (!usedNames.includes(randomName)) {
    return randomName.toLowerCase();
  }
  return getRandomName();
};

export const clearStoredName = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export function mapPastGussIntoEmoji(pastGuess: CheckedGuessState[]) {
  return pastGuess
    .map(({ status }) => {
      switch (status) {
        case LetterStatus.GRAY:
          return "⬛";
        case LetterStatus.GREEN:
          return "🟩";
        case LetterStatus.YELLOW:
          return "🟨";
        default:
          return "";
      }
    })
    .join("");
}

export function getShareableContent(pastGuesses: GuessState[]) {
  const emojiGuesses = pastGuesses.map((pg) =>
    mapPastGussIntoEmoji(pg.checkedGuess)
  );

  return emojiGuesses.join("\n");
}

export async function copyToClipboard(text: string) {
  await navigator.clipboard.writeText(text);
}

export function getTodayFormatted() {
  const today = new Date();
  const day = `${today.getDate()}`;
  const month = `${today.getMonth() + 1}`;
  const year = `${today.getFullYear()}`;
  return `${month}/${day}/${year.slice(2, year.length)}`;
}
