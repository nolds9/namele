import React from "react";

export const Footer = () => {
  return (
    <footer className={"justify-center items-center"}>
      &copy; {new Date().getFullYear()} - <a href={"https://github.com/nolds9"}>Nicholas Olds</a> -{" "}
      <a className={"p-1"} href={"https://github.com/nolds9/namele"}>
        Repo
      </a>
    </footer>
  );
};
