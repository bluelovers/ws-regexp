const {
  getInitialJamo,
  getMedialJamo,
  getFinalJamo,
  decompose
} = require("./jamo.decompose");

describe("Jamo decompose", () => {
  test("should extract ㅎ as initial consonant from 한", () => {
    expect(getInitialJamo("한")).toBe("ㅎ");
  });

  test("should extract ㅏ as medial vowel from 한", () => {
    expect(getMedialJamo("한")).toBe("ㅏ");
  });

  test("should extract nieun (ㄴ) as final consonant from 한", () => {
    expect(getFinalJamo("한")).toBe("ㄴ");
  });

  test("should extract ㄱ as initial consonant from 국", () => {
    expect(getInitialJamo("국")).toBe("ㄱ");
  });

  test("should extract ㅜ as medial vowel from 국", () => {
    expect(getMedialJamo("국")).toBe("ㅜ");
  });

  test("should extract ㄱ as final consonant from 국", () => {
    expect(getFinalJamo("국")).toBe("ㄱ");
  });

  test("should extract ㅁ as initial consonant from 말", () => {
    expect(getInitialJamo("말")).toBe("ㅁ");
  });

  test("should extract ㅏ as medial vowel from 말", () => {
    expect(getMedialJamo("말")).toBe("ㅏ");
  });

  test("should extract ㄹ as final consonant from 말", () => {
    expect(getFinalJamo("말")).toBe("ㄹ");
  });

  test("should extract ㅁ as initial consonant from 문", () => {
    expect(getInitialJamo("문")).toBe("ㅁ");
  });

  test("should extract ㅜ as medial vowel from 문", () => {
    expect(getMedialJamo("문")).toBe("ㅜ");
  });

  test("should extract ㄴ as final consonant from 문", () => {
    expect(getFinalJamo("문")).toBe("ㄴ");
  });

  test("should extract ㅁ as initial consonant from 맹", () => {
    expect(getInitialJamo("맹")).toBe("ㅁ");
  });

  test("should extract ㅐ as medial vowel from 맹", () => {
    expect(getMedialJamo("맹")).toBe("ㅐ");
  });

  test("should extract ㅇ as final consonant from 맹", () => {
    expect(getFinalJamo("맹")).toBe("ㅇ");
  });

  test("should extract ㅎ, ㅏ, ㄴ from 한 (54620)", () => {
    expect(decompose("한")).toStrictEqual([["ㅎ", "ㅏ", "ㄴ"]]);
  });

  test("should extract ㄱ, ㅜ, ㄱ from 국", () => {
    expect(decompose("국")).toStrictEqual([["ㄱ", "ㅜ", "ㄱ"]]);
  });

  test("should extract ㅁ, ㅏ, ㄹ from 말", () => {
    expect(decompose("말")).toStrictEqual([["ㅁ", "ㅏ", "ㄹ"]]);
  });

  test("should extract ㅁ, ㅜ, ㄴ from 문", () => {
    expect(decompose("문")).toStrictEqual([["ㅁ", "ㅜ", "ㄴ"]]);
  });

  test("should extract ㅁ, ㅐ, ㅇ from 맹", () => {
    expect(decompose("맹")).toStrictEqual([["ㅁ", "ㅐ", "ㅇ"]]);
  });

  test("should extract [[ㅁ, ㅜ, ㄴ],[ㅁ, ㅐ, ㅇ]] from 문맹", () => {
    expect(decompose("문맹")).toStrictEqual([
      ["ㅁ", "ㅜ", "ㄴ"],
      ["ㅁ", "ㅐ", "ㅇ"]
    ]);
  });
});
