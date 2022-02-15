import { LetterStatus } from "../../types";

export function checkGuess(guess: string[], secretWord: string) {
  const checkedGuess = guess.map((letter: string, i: number) => {
    let status;

    if (!secretWord.includes(letter)) {
      status = LetterStatus.GRAY;
    } else if (secretWord[i] === letter) {
      status = LetterStatus.GREEN;
    } else {
      status = LetterStatus.YELLOW;
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
