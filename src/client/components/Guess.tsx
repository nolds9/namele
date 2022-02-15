import React from "react";
import { Char } from "./Char";

type Props = {
  word: string[];
};
export const Guess = ({ word }: Props) => {
  const chars = Array.from({ length: 5 }).map((_, i) => (
    <Char key={i} letter={word[i] || ""} />
  ));
  return <div className="flex">{chars}</div>;
};
