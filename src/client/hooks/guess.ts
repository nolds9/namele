import { useState, useEffect } from "react";

export function useGuesses(secretWord: string) {
  const [guesses, setGuesses] = useState<string[][]>([[], [], [], [], []]);
  const [currentGuess, setCurrentGuess] = useState<string[]>([]);

  useEffect(() => {
    function handleEnter() {
      // TODO: add game over logic
      setGuesses((state) => [...state, currentGuess]);
    }

    function handleKeydown(event: KeyboardEvent) {
      const { key } = event;
      const isSingleChar = /[a-zA-Z]/.test(key) && key.length === 1;
      if (key === "Backspace") {
        setCurrentGuess((state) => state.slice(0, state.length - 1));
      } else if (key === "Enter") {
        return handleEnter();
      } else if (currentGuess.length < 5 && isSingleChar) {
        setCurrentGuess((state) => [...state, key]);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentGuess.length]);

  return { guesses, currentGuess };
}
