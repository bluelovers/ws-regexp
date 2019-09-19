const romanize = require("./romanize");

const testCases = {
  가: "ga",
  나: "na",
  다: "da",
  로마자: "romaja",
  만남: "mannam",
  동무: "dongmu",

};

describe("romanize function", () => {
  Object.entries(testCases).forEach(([hangeul, romaja]) => {
    test(`should romanize ${hangeul} to ${romaja}`, () => {
      expect(romanize(hangeul)).toBe(romaja);
    });
  });

  test("should romanize 로마자 as romaja", () => {
    expect(romanize("로마자 is the Korean word for Latin letters.")).toBe(
      "romaja is the Korean word for Latin letters."
    );
  });
});
