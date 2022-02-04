"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const isHangul_1 = tslib_1.__importDefault(require("./isHangul"));
const blocks_1 = require("./unicode/blocks");
const describeTestBlock = (description, jamoBlock, expected) => describe(description, () => {
    const [start, stop] = jamoBlock;
    for (let charCode = start; charCode <= stop; charCode += 1) {
        const char = String.fromCodePoint(charCode);
        test(`should determine ${char} is not hangul`, () => {
            if (expected) {
                expect((0, isHangul_1.default)(char)).toBeTruthy();
            }
            else {
                expect((0, isHangul_1.default)(char)).toBe(false);
            }
        });
    }
});
describe("isHangul", () => {
    describe("should return null", () => {
        test("for an undefined input", () => {
            expect((0, isHangul_1.default)()).toBeNull();
        });
        test("for a null input", () => {
            expect((0, isHangul_1.default)(null)).toBeNull();
        });
        test("for NaN input", () => {
            expect((0, isHangul_1.default)(NaN)).toBeNull();
        });
        test("for an object input", () => {
            expect((0, isHangul_1.default)({})).toBeNull();
        });
        test("for a number input", () => {
            expect((0, isHangul_1.default)(1945)).toBeNull();
        });
    });
    test("should return truthy for ㄱ", () => {
        expect((0, isHangul_1.default)("ㄱ")).toBeTruthy();
    });
    test("should return truthy for ㅏ", () => {
        expect((0, isHangul_1.default)("ㅏ")).toBeTruthy();
    });
    test("should return truthy for 가", () => {
        expect((0, isHangul_1.default)("가")).toBeTruthy();
    });
    describeTestBlock("basic Latin", blocks_1.BASIC_LATIN, false);
    // describeTestBlock(
    //   "Chinese/Japanese/Korean unified ideographs",
    //   CJK_UNIFIED_IDEOGRAPHS,
    //   false
    // );
    // describeTestBlock(
    //   "Chinese/Japanese/Korean symbols and punctuation",
    //   CJK_SYMBOLS_AND_PUNCTUATION,
    //   false
    // );
    // describeTestBlock("Hangul syllables", HANGUL_SYLLABLES, true);
    // describeTestBlock("Hangul jamo", HANGUL_JAMO, true);
    // describeTestBlock(
    //   "Hangul compatibility jamo",
    //   HANGUL_COMPATIBILITY_JAMO,
    //   true
    // );
    // describeTestBlock("Hangul jamo extended-A", HANGUL_JAMO_EXTENDED_A, true);
    // describeTestBlock("Hangul jamo extended-B", HANGUL_JAMO_EXTENDED_B, true);
});
//# sourceMappingURL=isHangul.test.js.map