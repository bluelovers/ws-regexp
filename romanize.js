const replaceHangul = require("./hangul/hangulReplace");
const { decomposeHangul } = require("./hangul/unicode/decompose");
const jamos = require("./jamo");
const _ = require("lodash");

const getJamoDictionary = (jamo, idx) =>
  _.find(jamos[idx], { jamo }) || _.find(jamos[idx], { compatJamo: jamo });

function searchJamo(node, params, prevNode) {
  const { method, vowelNext, consonantNext, consonantPrev } = params || {
    method: "RR"
  };

  if (typeof node === "string") {
    return node;
  }

  if (!node) {
    console.warn(prevNode);
    throw new Error("No node found:" + node);
  }

  // treat empty string (initial silent ieung/ㅇ as truthy)
  if (node.roman || typeof node.roman === "string") {
    return next(node.roman);
  }

  if (method && (node[method] || typeof node[method] === "string")) {
    return next(node[method]);
  }

  if (vowelNext && (node.vowelNext || typeof node.vowelNext === "string")) {
    return next(node.vowelNext);
  }

  if (consonantNext || consonantPrev) {
    const assimilation = String.fromCodePoint(consonantNext || consonantPrev);
    if (typeof node[assimilation] === "string") {
      return node[assimilation];
    } else if (node[assimilation]) {
      return node[assimilation];
    }
  }

  if (node.default || typeof node.default === "string") {
    return next(node.default);
  }

  throw new Error("Unimplemented: " + JSON.stringify(node, null, 2));

  function next(nextNode) {
    return searchJamo(nextNode, params, node);
  }
}

const syllableParser = (method = "RR") =>
  function(syllable, idx, word) {
    // next subsequent initial consonant (choseong)
    const next = idx + 1 < word.length ? word[idx + 1][0] : undefined;
    const vowelNext = next === 0x110b || next === "ᄋ";

    // only exists this isn't first syllable in word
    const prev = idx > 0 ? word[idx - 1] : null;

    // previous adjacent trailing consonant (jongseong)
    const consonantPrev = prev && prev[2] ? prev[2] : undefined;

    return syllable.map((jamo, jamoIdx) => {
      const dict =
        getJamoDictionary(jamo, jamoIdx) ||
        getJamoDictionary(String.fromCodePoint(jamo), jamoIdx);

      if (!dict) {
        throw new Error("missing dict " + jamo);
      }

      return searchJamo(dict, {
        method,
        vowelNext: jamoIdx === 2 ? vowelNext : undefined,
        consonantPrev: jamoIdx === 0 ? consonantPrev : undefined,
        consonantNext: jamoIdx === 2 ? next : undefined
      });
    });
  };

const mapJamoToRoman = (word, method = "RR") =>
  decomposeHangul(word).map(syllableParser(method));

const romanizeWord = (word, method = "RR") =>
  mapJamoToRoman(word, method)
    .reduce((acc, val) => acc.concat(val), [])
    .join("");

const romanize = (text, options) => replaceHangul(text, romanizeWord);

module.exports = { syllableParser, romanizeWord, romanize };
