// The precomposed hangul syllables in the Hangul Syllables block in Unicode are algorithmically defined, using the following formula:
// [(initial) × 588 + (medial) × 28 + (final)] + 44032

const { HANGUL } = require("./unicode-blocks");
const [START] = HANGUL.SYLLABLES;

const [initialConsonants, medialVowels, finalConsonants] = require("./jamo");

const getInitialJamoIdx = syllable =>
  Math.floor((syllable.charCodeAt(0) - START) / 588);

const getInitialJamo = syllable =>
  initialConsonants[getInitialJamoIdx(syllable)].jamo;

const getMedialJamoIdx = syllable => {
  const hangulCode = syllable.charCodeAt(0) - START;
  const initialJamo = getInitialJamoIdx(syllable);
  const medial = Math.floor((hangulCode - 588 * initialJamo) / 28);
  return medial;
};

const getMedialJamo = syllable => medialVowels[getMedialJamoIdx(syllable)].jamo;

const getFinalJamoIdx = syllable => {
  const hangulCode = syllable.charCodeAt(0) - START;
  const initial = getInitialJamoIdx(syllable);
  const medial = getMedialJamoIdx(syllable);
  return hangulCode - 588 * initial - 28 * medial;
};

const getFinalJamo = syllable => {
  const finalJamoIdx = getFinalJamoIdx(syllable);
  return finalJamoIdx ? finalConsonants[getFinalJamoIdx(syllable)].jamo : null;
};

const decomposeSyllable = syllable => {
  const initial = getInitialJamo(syllable);
  const medial = getMedialJamo(syllable);
  const final = getFinalJamo(syllable);
  return final ? [initial, medial, final] : [initial, medial];
};

const decompose = (word, options = {}) => {
  const syllabary = word.split("").map(decomposeSyllable);
  return options.flat || options.flatten
    ? // Array.flat() from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat#reduce_and_concat
      syllabary.reduce((acc, val) => acc.concat(val), [])
    : // as is
      syllabary;
};

module.exports = {
  getInitialJamo,
  getMedialJamo,
  getFinalJamo,
  decomposeSyllable,
  decompose
};
