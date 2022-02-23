import React, { Dispatch } from "react";
import { CheckedGuessState, GuessState } from "../../types";
import { flatten } from "../utils";
import { Key } from "./Key";

type Props = {
  pastGuesses: GuessState[];
  dispatch: Dispatch<any>;
};

const qwerty = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["Ent", "Z", "X", "C", "V", "B", "N", "M", "Del"],
];

export const Keyboard = ({ pastGuesses, dispatch }: Props) => {
  const allLetterStatuses = flatten(pastGuesses.map((pg) => pg.checkedGuess));
  const lsMap = allLetterStatuses.reduce(
    (acc: { [key: string]: string }, curr: CheckedGuessState) => {
      if (!Object.hasOwnProperty.call(acc, curr.letter)) {
        acc[curr.letter] = curr.status;
      }
      return acc;
    },
    {}
  );
  return (
    <>
      {qwerty.map((row, i) => (
        <div key={i} className="flex min-w-100 m-auto touch-manipulation">
          {row.map((letter) => (
            <Key
              key={letter}
              letter={letter}
              status={lsMap[letter.toLowerCase()]}
              dispatch={dispatch}
            />
          ))}
        </div>
      ))}
    </>
  );
};
