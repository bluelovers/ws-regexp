const romanizeJamo = require("./romanize.jamo");

describe("romanizeJamo", () => {
  describe("should let be already Roman/romanized strings as is", () => {
    ["j", "jamo", "Romaja", "string"].forEach(str => {
      test(str, () => {
        expect(romanizeJamo(str)).toBe(str);
      });
    });
  });


  // describe('should romanize 가"')

  test("should romanize ㅈ as j", () => {
    expect(romanizeJamo("ㅈ")).toBe("j");
  });

  describe("should romanize ㄷ", () => {
    test("as initial as d", () => {
      expect(romanizeJamo("ㄷ")).toBe("d");
    });

    test("as final as t", () => {
      expect(romanizeJamo("ㄷ", 2)).toBe("t");
    });

    test("followed by initial ㄴ as d", () => {
      expect(romanizeJamo("ㄷ", 2, "ㄴ")).toBe("nn");
    });

    test("followed by initial ㄴ as d", () => {
      expect(romanizeJamo("ㄷ", 2, "ㄹ")).toBe("nn");
    });

    test("followed by initial ㅁ as d", () => {
      expect(romanizeJamo("ㄷ", 2, "ㅁ")).toBe("nm");
    });

    test("followed by initial ㅌ as d", () => {
      expect(romanizeJamo("ㄷ", 2, "ㅌ")).toBe("t-t");
    });
  });
});
