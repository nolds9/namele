import React from "react";
import { CheckedGuessState } from "../../types";
import { getBaseCharClasses, getCharClassesByStatus } from "../utils";

type Props = {
  letterStatus: CheckedGuessState;
};

const baseClassNames = getBaseCharClasses();

export const PastChar = ({ letterStatus }: Props) => {
  return (
    <span
      className={`${baseClassNames} text-white ${getCharClassesByStatus(
        letterStatus.status
      )}`}
    >
      {letterStatus.letter.toUpperCase()}
    </span>
  );
};
