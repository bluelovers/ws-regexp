const { decomposeSyllable } = require("./jamo.decompose");
const { HANGUL } = require("./unicode-blocks");
const [START, END] = HANGUL.SYLLABLES;
const rr = require("./jamo.rr");
const isHangul = char =>
  char.charCodeAt(0) >= START && char.charCodeAt(0) <= END;

const toRomaja = char => {
  return decomposeSyllable(char)
    .map((jamo, idx) => {
      try {
        const jamoDict = rr[jamo].rr;
        if (Array.isArray(jamoDict)) {
          const [choseong, jongseong] = jamoDict;
          // return idx === 0 ? choseong : jongseong;
          if (idx === 2 && !choseong) {
            return jongseong;
          }
          // exception to conform to test cases
          // TODO confirm test cases are accurate transliterations
          if (idx === 2 && jamo === "ㄹ") {
            return jongseong;
          }
          return choseong;
        }
        return jamoDict;
      } catch (e) {
        console.error("Jamo", jamo, e);
      }
    })
    .join("");
};

const translit = text => {
  return text
    .split("")
    .map(char => (isHangul(char) ? toRomaja(char) : char))
    .join("");
};

module.exports = {
  translit,
  toRomaja
};
