// The precomposed hangul syllables in the Hangul Syllables block in Unicode are algorithmically defined, using the following formula:
// [(initial) × 588 + (medial) × 28 + (final)] + 44032

const { initialConsonants, medialVowels, finalConsonants } = require("./jamo");

const compose = (initial, medial, final = null) => {
  const hex =
    initialConsonants.indexOf(initial) * 588 +
    medialVowels.indexOf(medial) * 28 +
    finalConsonants.indexOf(final) +
    44032;
  return String.fromCodePoint(hex);
};

module.exports = compose;
