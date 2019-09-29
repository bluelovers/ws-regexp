const replaceHangul = require("./hangul/hangulReplace");
const { decomposeHangul } = require("./hangul/decompose");
const jamos = require("./jamo");
const _ = require("lodash");

const getJamoDictionary = (jamo, idx) =>
  _.find(jamos[idx], { jamo }) || _.find(jamos[idx], { compatJamo: jamo });

function searchJamo(node) {
  if (!node) {
    throw new Error("No node found.");
  }

  if (typeof node === "string") {
    return node;
  }

  if (node.roman) {
    return searchJamo(node.roman);
  }

  throw new Error("unimplemented");
}

function romanize(text) {
  return replaceHangul(text, romanizeWord);
}

function parseSyllable(syllable, idx, syllabary) {
  // next subsequent initial consonant (choseong)
  const next = idx + 1 < syllabary.length ? syllabary[idx + 1][0] : null;

  // previous adjacent trailing consonant (jongseong)
  const prev = idx > 0 ? syllabary[idx - 1][2] : null;

  return syllable.map((jamo, idx, syllable) => {
    const dict =
      getJamoDictionary(jamo, idx) ||
      getJamoDictionary(String.fromCodePoint(jamo), idx);
    if (!dict) {
      throw new Error("missing dict " + jamo);
    }

    return searchJamo(dict);
  });
}

const romanizeWord = word =>
  decomposeHangul(word)
    .map(parseSyllable)
    .reduce((acc, val) => acc.concat(val), [])
    .join("");

module.exports = { romanizeWord, romanize };
