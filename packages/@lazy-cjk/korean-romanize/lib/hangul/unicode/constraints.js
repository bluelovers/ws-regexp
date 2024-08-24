"use strict";
// Common constraints (based on the pseudocode provided in the Unicode spec)
Object.defineProperty(exports, "__esModule", { value: true });
exports.SCount = exports.NCount = exports.TCount = exports.VCount = exports.LCount = exports.TBase = exports.VBase = exports.LBase = exports.SBase = void 0;
exports.SBase = 0xac00;
exports.LBase = 0x1100;
exports.VBase = 0x1161;
/**
 * one less than the beginning of the range of trailing consonants, which starts at 0x11a8
 */
exports.TBase = 0x11a7;
/**
 * number of lead consonants in Hangul
 * @type {number}
 */
exports.LCount = 19;
/**
 * Number of LV_Syllables per each leading consonant
 */
exports.VCount = 21; // i.e. number of vowels in Hangul
/**
 * Number of LVT_Syllables per each possible trailing consonant
 */
exports.TCount = 28; // ie. the number of letters in Hangul
/**
 * Number of precomposed Hangul syllables
 */
exports.NCount = exports.VCount * exports.TCount; // VCount * TCount = 588
/**
 * Total number of precomposed Hangul syllables (11172)
 */
exports.SCount = exports.LCount * exports.NCount;
//# sourceMappingURL=constraints.js.map