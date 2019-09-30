const replaceHangul = require("./hangul/hangulReplace");
const { decomposeHangul } = require("./hangul/decompose");
const jamos = require("./jamo");
const _ = require("lodash");

const getJamoDictionary = (jamo, idx) =>
  _.find(jamos[idx], { jamo }) || _.find(jamos[idx], { compatJamo: jamo });

function searchJamo(node, params, prevNode) {
  const { method, vowelNext } = params || {};
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

  // console.log(params, vowelNext, node.vowelNext, node);
  if (vowelNext && (node.vowelNext || typeof node.vowelNext === "string")) {
    return next(node.vowelNext);
  }

  if (node.default || typeof node.default === "string") {
    return next(node.default);
  }

  console.warn(prevNode);
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

    // previous adjacent trailing consonant (jongseong)
    // const prev = idx > 0 ? word[idx - 1][2] : undefined;

    return syllable.map((jamo, jamoIdx) => {
      const dict =
        getJamoDictionary(jamo, jamoIdx) ||
        getJamoDictionary(String.fromCodePoint(jamo), jamoIdx);

      if (!dict) {
        throw new Error("missing dict " + jamo);
      }

      return searchJamo(dict, { method, vowelNext });
    });
  };

const romanizeWord = (word, method = "RR") =>
  decomposeHangul(word)
    .map(syllableParser(method))
    .reduce((acc, val) => acc.concat(val), [])
    .join("");

const romanize = (text, options) => replaceHangul(text, romanizeWord);

module.exports = { syllableParser, romanizeWord, romanize };
