// Common constraints (based on the pseudocode provided in the Unicode spec):

const SBase = 0xac00;
const LBase = 0x1100;
const VBase = 0x1161;

const TBase = 0x11a7; // one less than the beginning of the range of trailing consonants, which starts at 0x11a8
const LCount = 19;
const VCount = 21;
const TCount = 28; // one more than the number of trailing consonants relevant to the decomposition algorithm: (0x11C2 - 0x11A8 + 1) + 1

/*
Number of precomposed Hangul syllables starting with the same leading consonant, counting both
- LV_Syllables and
- LVT_Syllables
for each possible trailing consonant
*/
const NCount = VCount * TCount; // 588

// Total number of precomposed Hangul syllables
const SCount = LCount * NCount; // 11172 - total number of precomposed Hangul syllables

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
