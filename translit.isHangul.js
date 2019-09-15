const { HANGUL_UNICODE_BLOCKS } = require("./constants");

const isHangul = char => {
  if (typeof char !== "string") {
    return null;
  }
  
  const codePoint = char.codePointAt(0);

  for (const [block, [start, end]] of Object.entries(HANGUL_UNICODE_BLOCKS)) {
    if (codePoint >= start && codePoint <= end) {
      return block;
    }
  }
  return false;
};

module.exports = isHangul;
