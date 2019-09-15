const isHangul = require("./translit.isHangul");
const jamoLib = require("./jamo");
const { BASIC_LATIN, CJK_UNIFIED_IDEOGRAPHS } = require("./constants");

describe("isHangul", () => {
  test("should return null for a nonstring input", () => {
    expect(isHangul()).toBeNull();
  });
  
  // test every letter in the jamo library
  Object.entries(jamoLib).forEach(testJamoSet);

  // test every letter in the basic Latin character set
  describe("basic Latin", () => {
    const [start, stop] = BASIC_LATIN;
    for (let charCode = start; charCode <= stop; charCode += 1) {
      const char = String.fromCodePoint(charCode);
      test(`should determine ${char} is not hangul`, () => {
        expect(isHangul(char)).toBe(false);
      });
    }
  });

  // test very CJK ideograph
  describe("CJK unified characters", () => {
    const [start, stop] = CJK_UNIFIED_IDEOGRAPHS;
    for (let charCode = start; charCode <= stop; charCode += 1) {
      const char = String.fromCodePoint(charCode);
      test(`should determine ${char} is not hangul`, () => {
        expect(isHangul(char)).toBe(false);
      });
    }
  });
});

function testJamoSet([jamoSetName, jamos]) {
  describe(jamoSetName, () => {
    jamos
      .filter(jamo => jamo)
      .forEach(jamo => {
        test(`should determine ${jamo} is hangul`, () => {
          expect(isHangul(jamo)).toBeTruthy();
        });
      });
  });
}
