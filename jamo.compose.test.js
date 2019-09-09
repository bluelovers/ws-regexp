const compose = require("./jamo.compose");

describe("Jamo compose", () => {
  test("should translate ㅎ, ㅏ, ㄴ to 한", () => {
    expect(
      compose(
        "ㅎ",
        "ㅏ",
        "ㄴ"
      )
    ).toBe("한");
  });

  test("should translate ㄱ, ㅡ, ㄹ to 글", () => {
    expect(
      compose(
        "ㄱ",
        "ㅡ",
        "ㄹ"
      )
    ).toBe("글");
  });

  test("should translate ㅈ, ㅗ to 조", () => {
    expect(
      compose(
        "ㅈ",
        "ㅗ",
      )
    ).toBe("조");
  });

  test("should translate ㅅ, ㅓ, ㄴ to 선", () => {
    expect(
      compose(
        "ㅅ",
        "ㅓ",
        "ㄴ"
      )
    ).toBe("선");
  });
});
