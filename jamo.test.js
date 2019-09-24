const [initialConsonants, medialVowels, finalConsonants] = require("./jamo");
const _ = require("lodash");

describe("Jamo dictionary", () => {
  test("should return zero value for lack of (null) final consonant", () => {
    expect(finalConsonants.indexOf(null)).toBe(0);
  });

  test("should return value for 27 of ㅎ as final consonant", () => {
    expect(_.findIndex(finalConsonants, { jamo: "ㅎ" })).toBe(27);
  });

  test("should return value of zero for lack of ㅏ as medial vowel", () => {
    expect(_.findIndex(medialVowels, { jamo: "ㅏ" })).toBe(0);
  });

  test("should return value of 20 for lack of ㅣ as medial vowel", () => {
    expect(_.findIndex(medialVowels, { jamo: "ㅣ" })).toBe(20);
  });

  test("should return value of 18 for lack of ㅎ as initial consonant", () => {
    expect(_.findIndex(initialConsonants, { jamo: "ㅎ" })).toBe(18);
  });
});
