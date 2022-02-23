import React, { Dispatch } from "react";
import { LetterStatus, GameActionType } from "../../types";
import { getCharClassesByStatus } from "../utils";

type Props = {
  letter: string;
  status?: LetterStatus;
  dispatch: Dispatch<any>;
};

function getKeyBackground(status?: LetterStatus) {
  if (!status) return "bg-gray-300";
  return getCharClassesByStatus(status);
}

function getAction(letter: string) {
  switch (letter) {
    case "Ent":
      return { type: GameActionType.CHECK_GUESS };
    case "Del":
      return { type: GameActionType.DELETE_LETTER };
    default:
      return {
        type: GameActionType.SET_LETTER,
        data: letter.toLowerCase(),
      };
  }
}

export const Key = ({ letter, status, dispatch }: Props) => {
  return (
    <>
      <button
        onClick={() => dispatch(getAction(letter))}
        className={`md:w-16 md:h-16 md:text-2xl ${
          status ? "text-white" : ""
        } text-md font-bold w-12 h-12 flex mb-2 mr-2 justify-center items-center rounded-md cursor-pointer flex-1 ${getKeyBackground(
          status
        )}`}
      >
        {letter}
      </button>
    </>
  );
};
