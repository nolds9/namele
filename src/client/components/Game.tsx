import React, { useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/game";
import { useGuesses } from "../hooks/guess";
import { useSecretName } from "../hooks/name";
import { Guess } from "./Guess";
import { PastGuess } from "./PastGuess";
import { MAX_GUESSES } from "../constants";

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
  const hasGuessedCorrect = !!gameState.pastGuesses.find(
    (pg) => !!pg.isCorrect
  );
  const ifWonGame = gameState.isGameOver && hasGuessedCorrect;
  const ifLostGame = gameState.isGameOver && !hasGuessedCorrect;

  return (
    <>
      <div className="message">
        {ifWonGame && <div>Congrats!</div>}
        {ifLostGame && <div>Better luck next time!</div>}
      </div>
      <div className="game">
        {!numPastGuesses && <Guess word={gameState.currentGuess.guess} />}
        {!!numPastGuesses && PastWords}
        {!!numPastGuesses && numPastGuesses !== MAX_GUESSES && (
          <Guess word={gameState.currentGuess.guess} />
        )}
        {BlankWords}
      </div>
    </>
  );
};
