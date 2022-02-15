import React from "react";
import { getBaseCharClasses } from "../utils";

type Props = {
  letter: string;
};

const baseClassNames = getBaseCharClasses();

export const Char = ({ letter }: Props) => {
  return <span className={`${baseClassNames}`}>{letter}</span>;
};
