"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jamo_1 = require("./jamo");
const [initialConsonants, medialVowels, finalConsonants] = jamo_1.ListJamoRoman;
describe("Jamo dictionary", () => {
    test("should contain array of initial consonants (choseong)", () => {
        expect(initialConsonants).toBeInstanceOf(Array);
    });
    test("should contain initial consonants (choseong) array of length 19", () => {
        expect(initialConsonants).toHaveLength(19);
    });
    test("should contain array of medial vowels (jungseong)", () => {
        expect(medialVowels).toBeInstanceOf(Array);
    });
    test("should contain medial vowels (jungseong) array of length 21", () => {
        expect(medialVowels).toHaveLength(21);
    });
    test("should contain array of final consonants (jongseong)", () => {
        expect(finalConsonants).toBeInstanceOf(Array);
    });
    test("should contain final consonants (jongseong) array of length 28", () => {
        expect(finalConsonants).toHaveLength(28);
    });
    describe("roman", () => {
        test("should contain a Roman lookup object for final consonant ㄱ", () => {
            expect(finalConsonants[1].roman).toBeInstanceOf(Object);
        });
    });
});
//# sourceMappingURL=jamo.test.js.map