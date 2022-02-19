import React from "react";
import { getBaseCharClasses } from "../utils";

type Props = {
  letter: string;
  isInvalidName: boolean;
};

const baseClassNames = getBaseCharClasses();

export const Char = ({ letter, isInvalidName }: Props) => {
  return (
    <span
      className={`${baseClassNames} ${isInvalidName ? "border-red-600" : ""}`}
    >
      {letter.toUpperCase()}
    </span>
  );
};
