import React from "react";
import { CheckedGuessState } from "../../types";
import { PastChar } from "./PastChar";

type Props = {
  word: CheckedGuessState[];
};

export const PastGuess = ({ word }: Props) => {
  const chars = Array.from({ length: 5 }).map((_, i) => (
    <PastChar key={i} letterStatus={word[i]} />
  ));
  return <div className="flex">{chars}</div>;
};
