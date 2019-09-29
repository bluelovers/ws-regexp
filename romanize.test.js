const { romanize, romanizeWord } = require("./romanize");
const translations = require("./translations");

const testWords = {
  가: "ga",
  나: "na",
  다: "da",
  로마자: "romaja",
  만남: "mannam",
  동무: "dongmu"
};

describe("romanizeWord function", () => {
  Object.entries(testWords).forEach(([hangeul, romaja]) => {
    test(`should romanize ${hangeul} to ${romaja}`, () => {
      expect(romanizeWord(hangeul)).toBe(romaja);
    });
  });
});

describe("romanize function", () => {
  test("should romanize 로마자 as romaja", () => {
    expect(romanize("로마자 is the Korean word for Latin letters.")).toBe(
      "romaja is the Korean word for Latin letters."
    );
  });
});
