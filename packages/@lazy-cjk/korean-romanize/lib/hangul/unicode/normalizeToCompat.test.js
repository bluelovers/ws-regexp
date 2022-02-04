"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const normalizeToCompat_1 = tslib_1.__importDefault(require("./normalizeToCompat"));
describe("normalizeToCompat function", () => {
    test("should return false for non-Hangul", () => {
        expect((0, normalizeToCompat_1.default)("A")).toBe(false);
    });
    test("ᄀ (0x1100, choseong) should be normalized to compatibility jamo ㄱ (0x3131)", () => {
        expect((0, normalizeToCompat_1.default)(String.fromCodePoint(0x1100))).toBe(String.fromCodePoint(0x3131));
    });
    test("ᄂ (0x1102, choseong) should be normalized to compatibility jamo ㄴ (0x3134)", () => {
        expect((0, normalizeToCompat_1.default)(String.fromCodePoint(0x1102))).toBe(String.fromCodePoint(0x3134));
    });
    test("ᅧ (0x1167, jungseong) should be normalized to compatibility jamo ㅕ (0x3155)", () => {
        expect((0, normalizeToCompat_1.default)(String.fromCodePoint(0x1167))).toBe(String.fromCodePoint(0x3155));
    });
    test("ᆹ (0x11b9, jongseong) should be normalized to compatibility jamo ㅄ (0x3144)", () => {
        expect((0, normalizeToCompat_1.default)(String.fromCodePoint(0x11b9))).toBe(String.fromCodePoint(0x3144));
    });
});
//# sourceMappingURL=normalizeToCompat.test.js.map