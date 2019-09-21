const {
  //   hexToUnicodeChar,
  fullCanonicalDecomposition,
  arithmeticDecompositionMapingLV,
  arithmeticDecompositionMapingLVT
} = require("./hangul.decompose");

const hexCases = {
  A: 0x41,
  Z: 0x5a,
  ㅎ: 0x1112,
  ㅏ: 0x1161,
  ㄴ: 0x11ab
};

// describe("hexToUnicodeChar function", () => {
//   Object.entries(hexCases).forEach(([char, hex]) => {
//     test(`should render ${hex} as ${char}`, () => {
//       expect(hexToUnicodeChar(hex)).toBe(char);
//     });
//   });
// });

const hangulHexCases = {
  [String.fromCodePoint(0xd55c)]: [0x1112, 0x1161, 0x11ab],
  한: [0x1112, 0x1161, 0x11ab],
  [String.fromCodePoint(0xd4db)]: [0x1111, 0x1171, 0x11b6],
  퓛: [0x1111, 0x1171, 0x11b6],
  서: [0x1109, 0x1165],
  울: [0x110b, 0x116e, 0x11af],
  평: [0x1111, 0x1167, 0x11bc],
  양: [0x110b, 0x1163, 0x11bc]
};

describe("Hangul Unicode fullCanonicalDecomposition", () => {
  Object.entries(hangulHexCases).forEach(([hangul, charCodes]) => {
    test(`should decompose ${hangul} to character codes [${charCodes.join(
      ","
    )}]`, () => {
      expect(fullCanonicalDecomposition(hangul)).toStrictEqual(charCodes);
    });
  });
});

describe("arithmeticDecompositionMapingLV", () => {
  test("should pull out correct code points for ㅍ and ㅟ from 퓛", () => {
    expect(arithmeticDecompositionMapingLV(0xd4db)).toStrictEqual([
      0x1111,
      0x1171
    ]);
  });
});

describe("arithmeticDecompositionMapingLVT", () => {
  test("should pull out correct code point for trailing ㄹㅎ in 퓛", () => {
    expect(arithmeticDecompositionMapingLVT(0xd4db)[1]).toBe(0x11b6);
  });
});
