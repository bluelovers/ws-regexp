const translitJamo = require("./romanize.jamo");

describe("translitJamo", () => {
  test("should transliterate j as j", () => {
    expect(translitJamo("j")).toBe("j");
  });

  test("should transliterate g as g", () => {
    expect(translitJamo("g")).toBe("g");
  });

  test("should transliterate b as b", () => {
    expect(translitJamo("b")).toBe("b");
  });

  test("should transliterate [d,t] as d", () => {
    // expect(translitJamo(["d", "t"])).toBe("d");
    expect(translitJamo(["d", "t"])).toBe("d");
  });

  test("should transliterate [d,t] as d", () => {
    expect(translitJamo(["d", "t"], 1)).toBe("t");
  });

  test("should transliterate ㅈ as j", () => {
    expect(translitJamo("ㅈ")).toBe("j");
  });

  test("should transliterate ㅈ as j", () => {
    expect(translitJamo("ㅈ")).toBe("j");
  });

  describe("ㄷ", () => {
    test("should transliterate ㄷ as initial as d", () => {
      expect(translitJamo("ㄷ")).toBe("d");
    });

    test("should transliterate ㄷ as final as t", () => {
      expect(translitJamo("ㄷ", 2)).toBe("t");
    });

    test("should transliterate final ㄷ followed by initial ㄴ as d", () => {
      expect(translitJamo("ㄷ", 2, "ㄴ")).toBe("nn");
    });

    test("should transliterate final ㄷ followed by initial ㄴ as d", () => {
      expect(translitJamo("ㄷ", 2, "ㄹ")).toBe("nn");
    });

    test("should transliterate final ㄷ followed by initial ㅁ as d", () => {
      expect(translitJamo("ㄷ", 2, "ㅁ")).toBe("nm");
    });

    test("should transliterate final ㄷ followed by initial ㅌ as d", () => {
      expect(translitJamo("ㄷ", 2, "ㅌ")).toBe("t-t");
    });
  });
});
