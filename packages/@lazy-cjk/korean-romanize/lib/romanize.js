"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syllableParser = syllableParser;
exports.romanizeWord = romanizeWord;
exports.romanize = romanize;
const decompose_1 = require("./hangul/unicode/decompose");
const hangulReplace_1 = require("./hangul/hangulReplace");
const utils_1 = require("./utils");
function syllableParser(method) {
    return function (syllable, idx, word) {
        // next subsequent initial consonant (choseong)
        const next = idx + 1 < word.length ? word[idx + 1][0] : undefined;
        // @ts-ignore
        const vowelNext = next === 0x110b || next === "ᄋ";
        // only exists this isn't first syllable in word
        const prev = idx > 0 ? word[idx - 1] : null;
        // previous adjacent trailing consonant (jongseong)
        const consonantPrev = prev && prev[2] ? prev[2] : undefined;
        return syllable.map((jamo, jamoIdx) => {
            if (typeof jamo === 'string') {
                return jamo;
            }
            else if (jamo === null) {
                return '';
            }
            const dict = (0, utils_1.getJamoDictionary)(jamo, jamoIdx);
            if (!dict) {
                throw new RangeError("missing dict " + jamo);
            }
            const roman = (0, utils_1.searchJamo)(dict, {
                method,
                vowelNext: jamoIdx === 2 ? vowelNext : undefined,
                consonantPrev: jamoIdx === 0 ? consonantPrev : undefined,
                consonantNext: jamoIdx === 2 ? next : undefined,
            });
            return roman;
        });
    };
}
/**
 * only allow input korean text
 *
 * @example romanizeWord(`안녕하십니까`)
 */
function romanizeWord(word, options) {
    const { method, hyphenate, } = (0, utils_1.handleRomanizeOptions)(options);
    const mappedToRoman = (0, decompose_1.decomposeHangul)(word, method)
        .map(syllableParser(method))
        .reduce((prevSyllables, currentSyllable) => prevSyllables.concat(hyphenate ? [...currentSyllable, "-"] : currentSyllable), [])
        .join("")
        .replace("--", "-");
    return hyphenate === false
        ? mappedToRoman.replace("-", "")
        : mappedToRoman.replace(/-$/, "");
}
/**
 * only handle korean text
 *
 * @example romanize(`안녕하십니까 a b c 中文`)
 */
function romanize(text, options) {
    return (0, hangulReplace_1.hangulReplace)(text, word => romanizeWord(word, options));
}
exports.default = romanize;
//# sourceMappingURL=romanize.js.map