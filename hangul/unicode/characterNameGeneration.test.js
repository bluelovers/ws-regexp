const { getHangulCharName } = require("./characterNameGeneration");

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

describe("getHangulCharName function", () => {
  test(`should generate 'PWILH' for ${String.fromCodePoint(0xd4db)}`, () => {
    expect(getHangulCharName(String.fromCodePoint(0xd4db))).toBe(
      "HANGUL SYLLABLE PWILH"
    );
  });
});
