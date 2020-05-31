"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const characterNameGeneration_1 = require("./characterNameGeneration");
const hangulCharNames = {
    가: "ga",
    나: "na",
    다: "da",
};
describe("getHangulCharName function", () => {
    Object.entries(hangulCharNames).forEach(([hangulChar, expectedShortName]) => {
        const expectedName = "HANGUL SYLLABLE " + expectedShortName.toUpperCase();
        const name = characterNameGeneration_1.getHangulCharName(hangulChar);
        test(`should fetch '${expectedName}' for ${hangulChar}`, () => {
            expect(name).toBe(expectedName);
        });
    });
});
describe("getHangulCharName function", () => {
    test(`should generate 'PWILH' for ${String.fromCodePoint(0xd4db)}`, () => {
        expect(characterNameGeneration_1.getHangulCharName(String.fromCodePoint(0xd4db))).toBe("HANGUL SYLLABLE PWILH");
    });
});
//# sourceMappingURL=characterNameGeneration.test.js.map