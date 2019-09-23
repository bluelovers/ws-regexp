const { arithmeticPrimaryCompositeMapping } = require("./compose");

describe("arithmeticPrimaryCompositeMapping", () => {
  test(`should compose (0x1111, 0x1171, 0x11b6) ${String.fromCodePoint(
    0x1111,
    0x1171,
    0x11b6
  )} to 0xd4db (${String.fromCodePoint(0xd4db)})`, () => {
    expect(arithmeticPrimaryCompositeMapping(0x1111, 0x1171, 0x11b6)).toBe(
      0xd4db
    );
  });
});
