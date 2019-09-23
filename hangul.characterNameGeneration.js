const {
  computeSIndex,
  computeLIndex,
  computeVIndex,
  computeTIndex
} = require("./hangul.computations");

const {
  JAMO_L_TABLE,
  JAMO_V_TABLE,
  JAMO_T_TABLE
} = require("./hangul.shortNames");

/**
 * Generates a letter/jamo-derived short name for a given precomposed Hangul syllable
 *
 * @param {(string|integer)} s
 * @returns {string} Unicode Hangul syllable short name
 */
function getHangulCharShortName(s) {
  const SIndex = computeSIndex(s);
  const LIndex = computeLIndex(SIndex);
  const VIndex = computeVIndex(SIndex);
  const TIndex = computeTIndex(SIndex);

  return JAMO_L_TABLE[LIndex] + JAMO_V_TABLE[VIndex] + JAMO_T_TABLE[TIndex];
}

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
const getHangulCharName = s => "HANGUL SYLLABLE " + getHangulCharShortName(s);

module.exports = { getHangulCharShortName, getHangulCharName };
