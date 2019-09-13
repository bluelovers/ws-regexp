const { HANGUL_SYLLABLE_BLOCK } = require("./constants");
const { START, END } = HANGUL_SYLLABLE_BLOCK;
const { decomposeSyllable } = require("./jamo.decompose");
const rr = require("./jamo.rr");
const isHangul = char =>
  char.charCodeAt(0) >= START && char.charCodeAt(0) <= END;

const toRomaja = char => {
  return decomposeSyllable(char)
    .map((jamo, idx) => {
      try {
        const geulja = rr[jamo].rr;
        if (geulja.includes("/")) {
          const [jamo1, batchim] = geulja.split("/");
          return idx === 0 ? jamo1 : batchim;
        }
        return geulja;
      } catch (e) {
        console.error("Jamo", jamo, e);
      }
    })
    .join("");
};

const translit = text => {
  return text
    .split("")
    .map(char => {
      //   console.log(isHangul(char));
      //   console.log(char.charCodeAt(0), char.charCodeAt(0) > START);
      return isHangul(char) ? toRomaja(char) : char;
    })
    .join("");
};

module.exports = {
  translit,
  toRomaja
};
