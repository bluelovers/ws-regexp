"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHangulCharName = exports.getHangulCharShortName = void 0;
const computations_1 = require("./computations");
const jamoShortNames_1 = require("./jamoShortNames");
/**
 * Generates a letter/jamo-derived short name for a given precomposed Hangul syllable
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable short name
 */
function getHangulCharShortName(s) {
    const SIndex = (0, computations_1.computeSIndex)(s);
    const LIndex = (0, computations_1.computeLIndex)(SIndex);
    const VIndex = (0, computations_1.computeVIndex)(SIndex);
    const TIndex = (0, computations_1.computeTIndex)(SIndex);
    return jamoShortNames_1.JAMO_L_TABLE[LIndex] + jamoShortNames_1.JAMO_V_TABLE[VIndex] + jamoShortNames_1.JAMO_T_TABLE[TIndex];
}
exports.getHangulCharShortName = getHangulCharShortName;
/**
 * Constructs a precomposed Hangul syllable name
 *
 * Based on "Hangul Character Name Generation" as described in Unicode core
 * specification for sample code for Hangul algorithms, under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151)
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable name
 */
function getHangulCharName(s) {
    return "HANGUL SYLLABLE " + getHangulCharShortName(s);
}
exports.getHangulCharName = getHangulCharName;
//# sourceMappingURL=characterNameGeneration.js.map