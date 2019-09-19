const replaceHangul = require("./hangulReplace");
const { decompose } = require("./jamo.decompose");
const romanizeJamo = require("./romanize.jamo");

function romanize(text) {
  return replaceHangul(text, romanizeWord);
}

function parseSyllable(syllable, idx, syllabary) {
  const nextChoseong =
    idx + 1 < syllabary.length ? syllabary[idx + 1][0] : null;

  return syllable.map((jamo, idx) =>
    romanizeJamo(jamo, idx, nextChoseong, "rr")
  );
}

const romanizeWord = word =>
  decompose(word)
    .map(parseSyllable)
    .reduce((acc, val) => acc.concat(val), [])
    .join("");

module.exports = romanize;
