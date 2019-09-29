const unicodeBlocks = require("./unicode/blocks");
const hangulBlocks = Object.entries(unicodeBlocks).filter(([blockName]) =>
  blockName.startsWith("HANGUL")
);

/**
 * Check whether a provided character belongs to a Hangul Unicode block
 *
 * Returns null if input is not a string.
 *
 * @param {*} char
 */
const isHangul = char => {
  if (typeof char !== "string") {
    return null;
  }

  const codePoint = char.codePointAt(0);

  for (const [block, [start, end]] of hangulBlocks) {
    if (codePoint >= start && codePoint <= end) {
      return block;
    }
  }
  return false;
};

module.exports = isHangul;
