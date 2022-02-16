import { LetterStatus } from "../../types";
import { checkGuess } from "./";

describe("checkGuess", () => {
  it("should validate correctly when checking the solution", () => {
    const guess = "hello".split("");
    const secret = "hello";
    const expected = {
      guess,
      checkedGuess: [
        { letter: "h", status: LetterStatus.GREEN },
        { letter: "e", status: LetterStatus.GREEN },
        { letter: "l", status: LetterStatus.GREEN },
        { letter: "l", status: LetterStatus.GREEN },
        { letter: "o", status: LetterStatus.GREEN },
      ],
      isCorrect: true,
    };
    const actual = checkGuess(guess, secret);
    expect(actual).toStrictEqual(expected);
  });

  it("should validate correctly when checking against a word with no right letters", () => {
    const guess = "pizza".split("");
    const secret = "hello";
    const expected = {
      guess,
      checkedGuess: [
        { letter: "p", status: LetterStatus.GRAY },
        { letter: "i", status: LetterStatus.GRAY },
        { letter: "z", status: LetterStatus.GRAY },
        { letter: "z", status: LetterStatus.GRAY },
        { letter: "a", status: LetterStatus.GRAY },
      ],
      isCorrect: false,
    };
    const actual = checkGuess(guess, secret);
    expect(actual).toStrictEqual(expected);
  });

  it("should validate correctly when checking against a word with mixed letters", () => {
    const guess = "llama".split("");
    const secret = "hello";
    const expected = {
      guess,
      checkedGuess: [
        { letter: "l", status: LetterStatus.YELLOW },
        { letter: "l", status: LetterStatus.YELLOW },
        { letter: "a", status: LetterStatus.GRAY },
        { letter: "m", status: LetterStatus.GRAY },
        { letter: "a", status: LetterStatus.GRAY },
      ],
      isCorrect: false,
    };
    const actual = checkGuess(guess, secret);
    expect(actual).toStrictEqual(expected);
  });
  it("should validate correctly when checking a guess with multiple letters", () => {
    const guess = "hello".split("");
    const secret = "helps";
    const expected = {
      guess,
      checkedGuess: [
        { letter: "h", status: LetterStatus.GREEN },
        { letter: "e", status: LetterStatus.GREEN },
        { letter: "l", status: LetterStatus.GREEN },
        { letter: "l", status: LetterStatus.GRAY },
        { letter: "o", status: LetterStatus.GRAY },
      ],
      isCorrect: false,
    };
    const actual = checkGuess(guess, secret);
    expect(actual).toStrictEqual(expected);
  });
});
