"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arithmeticDecompositionMappingLV = arithmeticDecompositionMappingLV;
exports.arithmeticDecompositionMappingLVT = arithmeticDecompositionMappingLVT;
exports.decomposeHangulChar = decomposeHangulChar;
exports.decomposeHangul = decomposeHangul;
const constraints_1 = require("./constraints");
const computations_1 = require("./computations");
const utils_1 = require("../../utils");
/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LV" Hangul syllable types
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
function arithmeticDecompositionMappingLV(s) {
    const SIndex = (0, computations_1.computeSIndex)(s);
    const LIndex = (0, computations_1.computeLIndex)(SIndex);
    const VIndex = (0, computations_1.computeVIndex)(SIndex);
    const LPart = constraints_1.LBase + LIndex;
    const VPart = constraints_1.VBase + VIndex;
    return [LPart, VPart];
}
/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LVT" Hangul syllable types
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
function arithmeticDecompositionMappingLVT(s) {
    const SIndex = (0, computations_1.computeSIndex)(s);
    const LVIndex = (0, computations_1.computeLVIndex)(SIndex);
    const TIndex = (0, computations_1.computeTIndex)(SIndex);
    const LVPart = constraints_1.SBase + LVIndex;
    const TPart = constraints_1.TBase + TIndex;
    return [LVPart, TPart];
}
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
    const SIndex = (0, computations_1.handleSIndexInput)(s);
    const LVPart = arithmeticDecompositionMappingLV(s);
    const TIndex = (0, computations_1.computeTIndex)(SIndex);
    if (TIndex > 0) {
        const TPart = constraints_1.TBase + TIndex;
        return LVPart.concat([TPart]);
    }
    return LVPart;
}
/**
 * Returns a mapping of each Hangul character provided to an array of code points for the decomposed letters (jamo)
 *
 * @param {string} word
 * @returns {array}
 */
function decomposeHangul(word, method) {
    return [...word].map(s => {
        try {
            return decomposeHangulChar(s);
        }
        catch (e) {
            const ss = (0, utils_1.getJamoDictionary)(s, 0);
            if (ss) {
                return [(0, utils_1.searchJamo)(ss, {
                        method
                    })];
            }
            throw e;
        }
    });
}
//# sourceMappingURL=decompose.js.map