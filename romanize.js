const replaceHangul = require("./hangul/hangulReplace");
const { decomposeHangul } = require("./hangul/unicode/decompose");
const jamos = require("./jamo");

const getJamoDictionary = (jamo, idx) =>
  jamos[idx].find(o => o.jamo === jamo) ||
  jamos[idx].find(o => o.compatJamo === jamo);

function searchJamo(node, params, prevNode) {
  const { method, vowelNext, consonantNext, consonantPrev } = params || {
    method: "RR"
  };

  if (typeof node === "string") {
    return node;
  }

  if (!node) {
    if (prevNode) {
      console.warn(prevNode);
    }
    throw new Error("No node found after" + JSON.stringify(prevNode));
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

const syllableParser = method =>
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

      const roman = searchJamo(dict, {
        method,
        vowelNext: jamoIdx === 2 ? vowelNext : undefined,
        consonantPrev: jamoIdx === 0 ? consonantPrev : undefined,
        consonantNext: jamoIdx === 2 ? next : undefined
      });

      return roman;
    });
  };

const romanizeWord = (word, options) => {
  const { method = "RR", hyphenate = method === "RRT" || undefined } =
    typeof options === "object" ? options : {};

  const mappedToRoman = decomposeHangul(word)
    .map(syllableParser(method))
    .reduce(
      (prevSyllables, currentSyllable) =>
        prevSyllables.concat(
          hyphenate ? [...currentSyllable, "-"] : currentSyllable
        ),
      []
    )
    .join("")
    .replace("--", "-");

  return hyphenate === false
    ? mappedToRoman.replace("-", "")
    : mappedToRoman.replace(/-$/, "");
};

const romanize = (text, options) =>
  replaceHangul(text, word => romanizeWord(word, options));

module.exports = { searchJamo, syllableParser, romanizeWord, romanize };
