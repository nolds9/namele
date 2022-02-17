import React, { useReducer } from "react";
import { gameReducer, initialGameState } from "../reducers/game";
import { useGuesses } from "../hooks/guess";
import { useSecretName } from "../hooks/name";
import { Guess } from "./Guess";
import { PastGuess } from "./PastGuess";
import { MAX_GUESSES } from "../constants";
import { GameActionType } from "../../types";
import {
  clearStoredName,
  copyToClipboard,
  getShareableContent,
  getTodayFormatted,
} from "../utils";

export const Game = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGameState);
  useGuesses(gameState, dispatch);
  useSecretName(dispatch);

  function handlePlayAgain() {
    clearStoredName();
    dispatch({ type: GameActionType.PLAY_AGAIN });
  }

  const numPastGuesses = gameState.pastGuesses.length;
  const numBlankWords = MAX_GUESSES - numPastGuesses - 1;
  const PastWords = gameState.pastGuesses.map((pg, i) => (
    <PastGuess key={i} word={pg.checkedGuess} />
  ));
  const BlankWords = Array.from({ length: numBlankWords }).map((_, i) => (
    <Guess key={i} word={[]} isInvalidName={false} />
  ));
  const hasGuessedCorrect = !!gameState.pastGuesses.find(
    (pg) => !!pg.isCorrect
  );
  const isInvalidGuess = gameState.currentGuess.isInvalidWord;
  const ifWonGame = gameState.isGameOver && hasGuessedCorrect;
  const ifLostGame = gameState.isGameOver && !hasGuessedCorrect;

  async function handleShare() {
    const shareable = getShareableContent(gameState.pastGuesses);
    const text = `Namele ${getTodayFormatted()} ${
      ifLostGame ? "X" : numPastGuesses
    }/${MAX_GUESSES}\n${shareable}`;
    await copyToClipboard(text);
  }

  return (
    <>
      <div className="message text-2xl font-semibold">
        {!gameState.currentGuess.guess.length && !numPastGuesses && (
          <h4>Wordle, but with names. Guess a name to get started!</h4>
        )}
        {ifWonGame && (
          <h4>
            Congrats! You got the answer in {numPastGuesses}{" "}
            {numPastGuesses === 1 ? "guess" : "guesses"}!
          </h4>
        )}
        {ifLostGame && (
          <h4>Better luck next time! The answer was {gameState.secretWord}</h4>
        )}
        {isInvalidGuess && <h4>Not a valid name, try again!</h4>}
        {gameState.isGameOver && (
          <div className="mt-6 flex justify-center items-center">
            <button
              onClick={handlePlayAgain}
              className="px-4 py-2 text-white font-semibold border rounded-md border-black bg-black hover:text-black hover:bg-white hover:border-black"
            >
              Play again
            </button>
            <button
              className="px-4 py-2 ml-4 text-black font-semibold border rounded-md border-black hover:text-white hover:bg-black hover:border-transparent"
              onClick={handleShare}
            >
              Share
            </button>
          </div>
        )}
      </div>
      <div className="game">
        {!numPastGuesses && (
          <Guess
            word={gameState.currentGuess.guess}
            isInvalidName={isInvalidGuess}
          />
        )}
        {!!numPastGuesses && PastWords}
        {!!numPastGuesses && numPastGuesses !== MAX_GUESSES && (
          <Guess
            word={gameState.currentGuess.guess}
            isInvalidName={isInvalidGuess}
          />
        )}
        {BlankWords}
      </div>
    </>
  );
};
