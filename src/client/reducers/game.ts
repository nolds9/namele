import type { GameState, GameAction } from "../../types";
import { GameActionType } from "../../types";
import { checkGuess } from "../utils";

export const initialGameState: any = {
  currentGuess: {
    guess: [],
    checkedGuess: [],
    isCorrect: false,
    isInvalidWord: false,
  },
  pastGuesses: [],
  secretWord: "",
  isGameOver: false,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  console.log({ state, action });
  switch (action.type) {
    case GameActionType.CHECK_GUESS: {
      const checkedGuess = checkGuess(
        state.currentGuess.guess,
        state.secretWord
      );
      return {
        ...state,
        currentGuess: {
          ...state.currentGuess,
          ...checkedGuess,
        },
      };
    }
    case GameActionType.SET_LETTER:
      return {
        ...state,
        currentGuess: {
          ...state.currentGuess,
          guess: [...state.currentGuess.guess, action.data],
        },
      };
    case GameActionType.DELETE_LETTER:
      return {
        ...state,
        currentGuess: {
          ...state.currentGuess,
          guess: state.currentGuess.guess.slice(
            0,
            state.currentGuess.guess.length - 1
          ),
        },
      };
    case GameActionType.SET_SECRET_WORD:
      return {
        ...state,
        secretWord: action.data,
      };
    default:
      return state;
  }
}
