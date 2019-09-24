// The precomposed hangul syllables in the Hangul Syllables block in Unicode are algorithmically defined, using the following formula:
// [(initial) × 588 + (medial) × 28 + (final)] + 44032

const _ = require("lodash");
const [initialConsonants, medialVowels, finalConsonants] = require("./jamo");

const compose = (initial, medial, final = null) => {
  const hex =
    _.findIndex(initialConsonants, { jamo: initial }) * 588 +
    _.findIndex(medialVowels, { jamo: medial }) * 28 +
    (final ? _.findIndex(finalConsonants, { jamo: final }) : 0) +
    44032;
  return String.fromCodePoint(hex);
};

module.exports = compose;
