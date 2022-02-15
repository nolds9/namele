import { useEffect, Dispatch } from "react";
import { GameActionType, GameState } from "../../types";

export function useGuesses(state: GameState, dispatch: Dispatch<any>) {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      const { key } = event;
      const isSingleChar = /[a-zA-Z]/.test(key) && key.length === 1;
      if (key === "Backspace") {
        dispatch({ type: GameActionType.DELETE_LETTER });
      } else if (key === "Enter") {
        dispatch({ type: GameActionType.CHECK_GUESS });
      } else if (state.currentGuess.guess.length < 5 && isSingleChar) {
        dispatch({ type: GameActionType.SET_LETTER, data: key });
      }
    }
    if (!state.isGameOver) {
      window.addEventListener("keydown", handleKeydown);
    } else {
      window.removeEventListener("keydown", handleKeydown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [state.currentGuess.guess.length, dispatch, state.isGameOver]);

  return [state, dispatch];
}
