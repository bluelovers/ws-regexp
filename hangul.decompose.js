const {
  SBase,
  LBase,
  VBase,
  TBase,
  NCount,
  TCount
} = require("./hangul.constraints");

/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
const intDiv = (dividend, divisor) => Math.floor(dividend / divisor);

/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LV" Hangul syllable types
 * 
 * @param {(string|integer)} s
 * @returns {array}
 */
function arithmeticDecompositionMappingLV(s) {
  const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

  const LIndex = intDiv(SIndex, NCount); // integer division rounded down
  const VIndex = intDiv(SIndex % NCount, TCount);
  const LPart = LBase + LIndex;
  const VPart = VBase + VIndex;
  return [LPart, VPart];
}

/**
 * Based on "Arithmetic Decomposition Mapping" as described in Unicode core spec for "LVT" Hangul syllable types
 * 
 * @param {(string|integer)} s
 * @returns {array}
 */
function arithmeticDecompositionMappingLVT(s) {
  const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

  const LVIndex = (SIndex / TCount) * TCount;
  const TIndex = SIndex % TCount;
  const LVPart = SBase + LVIndex;
  const TPart = TBase + TIndex;

  return [LVPart, TPart];
}

/**
 * Returns a canonical decomposition of a precomposed/composite Hangul syllable
 * 
 * Based on "Full Canonical Decomposition" as described in Unicode core spec as
 * a recursive application of canonical decomposition mappings.
 * 
 * In other words:
 * 
 * This function returns the code points for the letters (jamo) derived
 * algorithmically from a given Hangul syllable's code point.
 *
 * The algorithm is described the core specification (v. 12.1, Chapter 3) in
 * the section "3.12 Conjoining Jamo Behavior" (pp. 142-151).
 *
 * @param {(string|integer)} s
 * @returns {array}
 */
function decomposeHangulChar(s) {
  const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

  const LVPart = arithmeticDecompositionMappingLV(s);
  const TIndex = SIndex % TCount;

  if (TIndex > 0) {
    const TPart = TBase + TIndex;
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
const decomposeHangul = word => [...word].map(decomposeHangulChar);

module.exports = {
  intDiv,
  arithmeticDecompositionMappingLV,
  arithmeticDecompositionMappingLVT,
  decomposeHangulChar,
  decomposeHangul
};
