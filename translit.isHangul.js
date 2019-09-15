const { HANGUL } = require("./unicode-blocks");

const isHangul = char => {
  if (typeof char !== "string") {
    return null;
  }
  
  const codePoint = char.codePointAt(0);

  for (const [block, [start, end]] of Object.entries(HANGUL)) {
    if (codePoint >= start && codePoint <= end) {
      return block;
    }
  }
  return false;
};

module.exports = isHangul;
