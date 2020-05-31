"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decomposeHangul = exports.decomposeHangulChar = exports.arithmeticDecompositionMappingLVT = exports.arithmeticDecompositionMappingLV = void 0;
const constraints_1 = require("./constraints");
const computations_1 = require("./computations");
/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LV" Hangul syllable types
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
function arithmeticDecompositionMappingLV(s) {
    const SIndex = computations_1.computeSIndex(s);
    const LIndex = computations_1.computeLIndex(SIndex);
    const VIndex = computations_1.computeVIndex(SIndex);
    const LPart = constraints_1.LBase + LIndex;
    const VPart = constraints_1.VBase + VIndex;
    return [LPart, VPart];
}
exports.arithmeticDecompositionMappingLV = arithmeticDecompositionMappingLV;
/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LVT" Hangul syllable types
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
function arithmeticDecompositionMappingLVT(s) {
    const SIndex = computations_1.computeSIndex(s);
    const LVIndex = computations_1.computeLVIndex(SIndex);
    const TIndex = computations_1.computeTIndex(SIndex);
    const LVPart = constraints_1.SBase + LVIndex;
    const TPart = constraints_1.TBase + TIndex;
    return [LVPart, TPart];
}
exports.arithmeticDecompositionMappingLVT = arithmeticDecompositionMappingLVT;
/**
 * Derives a canonical decomposition of a precomposed/composite Hangul syllable
 *
 * Based on "Full Canonical Decomposition" as described in Unicode core
 * specification for canonical decomposition mappings.
 *
 * In other words:
 *
 * This function computes the code points for the Hangul letters (jamo) derived
 * algorithmically for a given Hangul syllable's code point.
 *
 * The algorithm is described in the core spec (v. 12.1, Chapter 3), under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151).
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
function decomposeHangulChar(s) {
    const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - constraints_1.SBase;
    const LVPart = arithmeticDecompositionMappingLV(s);
    const TIndex = computations_1.computeTIndex(SIndex);
    if (TIndex > 0) {
        const TPart = constraints_1.TBase + TIndex;
        return LVPart.concat([TPart]);
    }
    return LVPart;
}
exports.decomposeHangulChar = decomposeHangulChar;
/**
 * Returns a mapping of each Hangul character provided to an array of code points for the decomposed letters (jamo)
 *
 * @param {string} word
 * @returns {array}
 */
function decomposeHangul(word) {
    return [...word].map(decomposeHangulChar);
}
exports.decomposeHangul = decomposeHangul;
//# sourceMappingURL=decompose.js.map