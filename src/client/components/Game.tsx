import React, { useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/game";
import { useGuesses } from "../hooks/guess";
import { useSecretName } from "../hooks/name";
import { Guess } from "./Guess";
import { PastGuess } from "./PastGuess";
const MAX_GUESSES = 6;

export const Game = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  useGuesses(gameState, dispatch);
  useSecretName(dispatch);

  const numPastGuesses = gameState.pastGuesses.length;
  const numBlankWords = MAX_GUESSES - numPastGuesses - 1;
  const PastWords = gameState.pastGuesses.map((pg, i) => (
    <PastGuess key={i} word={pg.checkedGuess} />
  ));
  const BlankWords = Array.from({ length: numBlankWords }).map((_, i) => (
    <Guess key={i} word={[]} />
  ));
  return (
    <div className="game">
      {!numPastGuesses && <Guess word={gameState.currentGuess.guess} />}
      {!!numPastGuesses && PastWords}
      {!!numPastGuesses && <Guess word={gameState.currentGuess.guess} />}
      {BlankWords}
    </div>
  );
};
