const [initialConsonants, medialVowels, finalConsonants] = require("./jamo");
const _ = require("lodash");

describe("Jamo dictionary", () => {
  test("should contain array of initial consonants (choseong)", () => {
    expect(initialConsonants).toBeInstanceOf(Array);
  });

  test("should contain initial consonants (choseong) array of length 19", () => {
    expect(initialConsonants).toHaveLength(19);
  });

  test("should contain array of medial vowels (jungseong)", () => {
    expect(medialVowels).toBeInstanceOf(Array);
  });

  test("should contain medial vowels (jungseong) array of length 21", () => {
    expect(medialVowels).toHaveLength(21);
  });

  test("should contain array of final consonants (jongseong)", () => {
    expect(finalConsonants).toBeInstanceOf(Array);
  });

  test("should contain final consonants (jongseong) array of length 28", () => {
    expect(finalConsonants).toHaveLength(28);
  });

  describe("roman", () => {
    test("should contain a Roman lookup object for final consonant ㄱ", () => {
      expect(finalConsonants[1].roman).toBeInstanceOf(Object);
    });

    test("should find ㅁ (hex) assimilation for ㄱ final consonant to be 'ng'", () => {
      expect(finalConsonants[1].roman[String.fromCodePoint(0x11b7)]).toBe("ng");
    });

    test("should find ㅁ (decimal) assimilation for ㄱ final consonant to be 'ng'", () => {
      expect(finalConsonants[1].roman[String.fromCodePoint(4535)]).toBe("ng");
    });
  });
});
