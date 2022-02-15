import type { GameState, GameAction } from "../../types";
import { GameActionType } from "../../types";
import { checkGuess } from "../utils";
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
  console.log(action);
  let nextState = state;
  switch (action.type) {
    case GameActionType.CHECK_GUESS: {
      const checkedGuess = checkGuess(
        state.currentGuess.guess,
        state.secretWord
      );
      const updatedCurrentGuess = {
        ...state.currentGuess,
        ...checkedGuess,
      };
      nextState = {
        ...state,
        currentGuess: {
          ...initialGameState.currentGuess,
        },
        pastGuesses: [...state.pastGuesses, updatedCurrentGuess],
        isGameOver:
          updatedCurrentGuess.isCorrect ||
          state.pastGuesses.length + 1 === MAX_GUESSES,
      };
      break;
    }
    case GameActionType.SET_LETTER:
      nextState = {
        ...state,
        currentGuess: {
          ...state.currentGuess,
          guess: [...state.currentGuess.guess, action.data],
        },
      };
      break;
    case GameActionType.DELETE_LETTER:
      nextState = {
        ...state,
        currentGuess: {
          ...state.currentGuess,
          guess: state.currentGuess.guess.slice(
            0,
            state.currentGuess.guess.length - 1
          ),
        },
      };
      break;
    case GameActionType.SET_SECRET_WORD:
      nextState = {
        ...state,
        secretWord: action.data,
      };
      break;
    default:
      return state;
  }
  console.log({ nextState });
  return nextState;
}
