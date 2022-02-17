import type { GameState, GameAction } from "../../types";
import { GameActionType } from "../../types";
import { checkGuess, getRandomName, validateName } from "../utils";
import { MAX_GUESSES } from "../constants";

export const initialGameState: GameState = {
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
  switch (action.type) {
    case GameActionType.CHECK_GUESS: {
      const isValidName = validateName(state.currentGuess.guess);
      if (!isValidName) {
        return {
          ...state,
          currentGuess: {
            ...state.currentGuess,
            isInvalidWord: true,
          },
        };
      }
      const checkedGuess = checkGuess(
        state.currentGuess.guess,
        state.secretWord
      );
      const updatedCurrentGuess = {
        ...state.currentGuess,
        ...checkedGuess,
      };
      return {
        ...state,
        currentGuess: {
          ...initialGameState.currentGuess,
        },
        pastGuesses: [...state.pastGuesses, updatedCurrentGuess],
        isGameOver:
          updatedCurrentGuess.isCorrect ||
          state.pastGuesses.length + 1 === MAX_GUESSES,
      };
    }
    case GameActionType.SET_LETTER:
      return {
        ...state,
        currentGuess: {
          ...state.currentGuess,
          guess: [...state.currentGuess.guess, action.data],
          isInvalidWord: false,
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
          isInvalidWord: false,
        },
      };
    case GameActionType.SET_SECRET_WORD:
      return {
        ...state,
        secretWord: action.data,
      };
    case GameActionType.PLAY_AGAIN: {
      const randomName = getRandomName();
      return { ...initialGameState, secretWord: randomName };
    }
    default:
      return state;
  }
}
