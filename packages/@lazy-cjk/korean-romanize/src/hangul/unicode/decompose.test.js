const {
  arithmeticDecompositionMappingLV,
  arithmeticDecompositionMappingLVT,
  decomposeHangulChar,
  decomposeHangul
} = require("./decompose");

const hangulHexCases = {
  훈: [0x1112, 0x116e, 0x11ab],
  민: [0x1106, 0x1175, 0x11ab],
  정: [0x110c, 0x1165, 0x11bc],
  음: [0x110b, 0x1173, 0x11b7],
  한: [0x1112, 0x1161, 0x11ab],
  조: [0x110c, 0x1169],
  선: [0x1109, 0x1165, 0x11ab],
  글: [0x1100, 0x1173, 0x11af],
  서: [0x1109, 0x1165],
  울: [0x110b, 0x116e, 0x11af],
  평: [0x1111, 0x1167, 0x11bc],
  양: [0x110b, 0x1163, 0x11bc],
  퓛: [0x1111, 0x1171, 0x11b6]
};

describe("arithmeticDecompositionMappingLV", () => {
  test("should pull out correct code points for ㅍ and ㅟ from 0xd4db (퓛)", () => {
    expect(arithmeticDecompositionMappingLV(0xd4db)).toStrictEqual([
      0x1111,
      0x1171
    ]);
  });

  test("should pull out correct code points for ㅍ and ㅟ from 퓛", () => {
    expect(arithmeticDecompositionMappingLV("퓛")).toStrictEqual([
      0x1111,
      0x1171
    ]);
  });
});

describe("arithmeticDecompositionMappingLVT", () => {
  test("should pull out correct code point for trailing ㄹㅎ in 0x11b6 (퓛)", () => {
    expect(arithmeticDecompositionMappingLVT(0xd4db)[1]).toBe(0x11b6);
  });

  test("should pull out correct code point for trailing ㄹㅎ in 퓛", () => {
    expect(arithmeticDecompositionMappingLVT("퓛")[1]).toBe(0x11b6);
  });
});

describe("decomposeHangulChar", () => {
  Object.entries(hangulHexCases).forEach(([hangul, charCodes]) => {
    test(`should decompose ${hangul} to character codes [${charCodes.join(
      ","
    )}] (${String.fromCodePoint(...charCodes)})`, () => {
      expect(decomposeHangulChar(hangul)).toStrictEqual(charCodes);
    });

    test(`should decompose code point ${hangul.codePointAt(
      0
    )} (${hangul}) to character codes [${charCodes.join(",")}]`, () => {
      expect(decomposeHangulChar(hangul.codePointAt(0))).toStrictEqual(
        charCodes
      );
    });
  });
});

describe("decomposeHangul (word)", () => {
  test("should decompose 훈민정음 into correct code points for each character", () => {
    expect(decomposeHangul("훈민정음")).toStrictEqual([
      [0x1112, 0x116e, 0x11ab],
      [0x1106, 0x1175, 0x11ab],
      [0x110c, 0x1165, 0x11bc],
      [0x110b, 0x1173, 0x11b7]
    ]);
  });
});
