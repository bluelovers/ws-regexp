const { getHangulCharName } = require("./hangul.characterNameGeneration");
const lo = require("unicode/category/Lo");

const hangulCharNames = {
  가: "ga",
  나: "na",
  다: "da"
};

describe("getHangulCharName function", () => {
  Object.entries(hangulCharNames).forEach(([hangulChar, expectedShortName]) => {
    const expectedName = "HANGUL SYLLABLE " + expectedShortName.toUpperCase();
    const name = getHangulCharName(hangulChar);

    test(`should fetch '${expectedName}' for ${hangulChar}`, () => {
      expect(name).toBe(expectedName);
    });
  });
});
