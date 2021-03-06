import React from "react";
import { Char } from "./Char";

type Props = {
  word: string[];
  isInvalidName: boolean;
};

export const Guess = ({ word, isInvalidName }: Props) => {
  const chars = Array.from({ length: 5 }).map((_, i) => (
    <Char key={i} letter={word[i] || ""} isInvalidName={isInvalidName} />
  ));
  return <div className="flex">{chars}</div>;
};
