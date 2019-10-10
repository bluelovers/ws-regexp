const { SBase, LBase, VBase, TBase, NCount, TCount } = require("./constraints");

/**
 * Computes TIndex for a given TPart
 *
 * @param {integer} TPart
 * @returns {integer}
 */
const computeTIndexFromTPart = (TPart = 0) => TPart - TBase;

/**
 * Computes a precomposed/composite syllable mapping for a given a Hangul letter (jamo) sequence
 *
 * Based on "Arithmetic Primary Composite Mapping" as described in Unicode core
 * specification for Hangul syllable composition.
 *
 * In other words:
 *
 * This function computes the code point for a precomposed/composite Hangul syllable
 * algorithmically for a given sequence of Hangul letter (jamo) code points.
 *
 * The algorithm is described in the core spec (v. 12.1, Chapter 3), under section
 * "3.12 Conjoining Jamo Behavior" (pp. 142-151).
 *
 * @param {integer} LPart
 * @param {integer} VPart
 * @param {integer} TPart
 * @returns {integer}
 */
function arithmeticPrimaryCompositeMapping(LPart, VPart, TPart) {
  if (LPart < 0x1100 && LPart > 0x1112) {
    throw new Error("LPart not within range U+1100..U+1112: " + LPart);
  }

  if (VPart < 0x1161 && VPart > 0x1175) {
    throw new Error("VPart not within range U+1161..U+1175: " + VPart);
  }

  if (TPart && TPart < 0x11a8 && TPart > 0x11c2) {
    throw new Error("TPart not within range U+11A8..U+11C2: " + TPart);
  }

  const LIndex = LPart - LBase;
  const VIndex = VPart - VBase;
  const LVIndex = LIndex * NCount + VIndex * TCount;
  const TIndex = computeTIndexFromTPart(TPart);

  return SBase + LVIndex + TIndex;
}

function arithmeticPrimaryCompositeMappingWithLVPart(LVPart, TPart) {
  const TIndex = computeTIndexFromTPart(TPart);
  return LVPart + TIndex;
}

module.exports = {
  computeTIndexFromTPart,
  arithmeticPrimaryCompositeMapping,
  arithmeticPrimaryCompositeMappingWithLVPart
};
