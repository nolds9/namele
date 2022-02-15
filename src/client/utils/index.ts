import { LetterStatus } from "../../types";

export function checkGuess(guess: string[], secretWord: string) {
  // TODO: check guess
  return {
    isGameOver: true,
    checkedGuess: [],
  };
}

export function getBaseCharClasses() {
  return "border-2 w-16 h-16 m-1 flex justify-center items-center";
}

export function getCharClassesByStatus(status: LetterStatus) {
  switch (status) {
    case LetterStatus.GREEN:
      return "bg-green-600";
    case LetterStatus.GREY:
      return "bg-grey-500";
    case LetterStatus.YELLOW:
      return "bg-yellow-400";
    default:
      return "";
  }
}
