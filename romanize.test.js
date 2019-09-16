const romanize = require("./romanize");

describe("romanize", () => {
  test("should romanize 로마자 as romaja", () => {
    expect(romanize("로마자")).toBe("romaja");
  });
});
