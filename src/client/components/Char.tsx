import React from "react";

type Props = {
  letter: string;
};

export const Char = ({ letter }: Props) => {
  return (
    <span className="border-2 w-16 h-16 m-1 flex justify-center items-center">
      {letter}
    </span>
  );
};
