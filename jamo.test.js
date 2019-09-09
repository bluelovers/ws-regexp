const { initialConsonants, medialVowels, finalConsonants } = require("./jamo");
describe("Jamo dictionary", () => {
  test("should return zero value for lack of (null) batchim/final consonaunt", () => {
    expect(finalConsonants.indexOf(null)).toBe(0);
  });

  test("should return value for 27 of ㅎ as batchim/final consonaunt", () => {
    expect(finalConsonants.indexOf("ㅎ")).toBe(27);
  });

  test("should return value of zero for lack of ㅏ as medial vowel", () => {
    expect(medialVowels.indexOf("ㅏ")).toBe(0);
  });

  test("should return value of 20 for lack of ㅣ as medial vowel", () => {
    expect(medialVowels.indexOf("ㅣ")).toBe(20);
  });

  test("should return value of 18 for lack of ㅎ as initial consonaunt", () => {
    expect(initialConsonants.indexOf("ㅎ")).toBe(18);
  });
});
