const { SBase, NCount, TCount, SCount } = require("./hangul.constraints");

/**
 * Returns an integer division quotient (rounded down)
 *
 * @param {number} dividend
 * @param {number} divisor
 */
const intDiv = (dividend, divisor) => Math.floor(dividend / divisor);

/**
 *
 * @param {(string|integer)} s
 */
function computeSIndex(s) {
  const SIndex = (typeof s === "string" ? s.charCodeAt(0) : s) - SBase;

  if (0 > SIndex || SIndex >= SCount) {
    throw new Error(`Not a Hangul syllable: ${s}`);
  }

  return SIndex;
}

/**
 *
 * @param {integer} SIndex
 */
const computeLIndex = SIndex => intDiv(SIndex, NCount); // integer division rounded down

/**
 *
 * @param {integer} SIndex
 */
const computeVIndex = SIndex => intDiv(SIndex % NCount, TCount);

/**
 *
 * @param {integer} SIndex
 */
const computeTIndex = SIndex => SIndex % TCount;

/**
 *
 * @param {integer} SIndex
 */
const computeLVIndex = SIndex => (SIndex / TCount) * TCount;

module.exports = {
  intDiv,
  computeSIndex,
  computeLIndex,
  computeVIndex,
  computeTIndex,
  computeLVIndex
};
