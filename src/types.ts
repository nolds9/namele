/* eslint-disable no-unused-vars */
export enum LetterStatus {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  GREY = "GREY",
}

export type CheckedGuessState = {
  letter: "";
  status: LetterStatus;
};

export type GuessState = {
  guess: string[];
  isCorrect: boolean;
  checkedGuess: CheckedGuessState[];
};

export type GameState = {
  currentGuess: GuessState;
  pastGuesses: GuessState[];
  secretWord: string;
};

export enum GameActionType {
  SET_SECRET_WORD = "SET_SECRET_WORD",
  SET_LETTER = "SET_LETTER",
  DELETE_LETTER = "DELETE_LETTER",
  CHECK_GUESS = "CHECK_GUESS",
}

export type GameAction =
  | {
      type: GameActionType.SET_SECRET_WORD;
      data: string;
    }
  | {
      type: GameActionType.CHECK_GUESS;
    }
  | { type: GameActionType.DELETE_LETTER }
  | { type: GameActionType.SET_LETTER; data: string };
