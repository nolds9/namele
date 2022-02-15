import React from "react";
import { useGuesses } from "../hooks/guess";
import { Guess } from "./Guess";

export const Guesses = () => {
  const word = "hello";
  const { currentGuess } = useGuesses(word);

  //   const grid = Array.from({ length: 5 }).map((_, i) => (
  //     <Guess key={i} word={guesses[i]} />
  //   ));

  return (
    <div>
      <Guess word={currentGuess} />
    </div>
  );
};
