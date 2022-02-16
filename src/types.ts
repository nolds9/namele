/* eslint-disable no-unused-vars */
export enum LetterStatus {
  GREEN = "GREEN",
  YELLOW = "YELLOW",
  GRAY = "GRAY",
}

export type CheckedGuessState = {
  letter: string;
  status: LetterStatus;
};

export type GuessState = {
  guess: string[];
  isCorrect: boolean;
  checkedGuess: CheckedGuessState[];
};

export type GameState = {
  currentGuess: GuessState & { isInvalidWord: boolean };
  pastGuesses: GuessState[];
  secretWord: string;
  isGameOver: boolean;
};

export enum GameActionType {
  SET_SECRET_WORD = "SET_SECRET_WORD",
  SET_LETTER = "SET_LETTER",
  DELETE_LETTER = "DELETE_LETTER",
  CHECK_GUESS = "CHECK_GUESS",
  PLAY_AGAIN = "PLAY_AGAIN",
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
  | { type: GameActionType.SET_LETTER; data: string }
  | { type: GameActionType.PLAY_AGAIN };
