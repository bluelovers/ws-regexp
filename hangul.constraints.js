// Common constraints (based on the pseudocode provided in the Unicode spec)

const LCount = 19; // number of lead consonants in Hangul

// Number of LV_Syllables per each leading consonant
const VCount = 21; // i.e. number of vowels in Hangul

// Number of LVT_Syllables per each possible trailing consonant
const TCount = 28; // ie. the number of letters in Hangul

// Number of precomposed Hangul syllables
const NCount = VCount * TCount; // VCount * TCount = 588

module.exports = {
  SBase: 0xac00,
  LBase: 0x1100,
  VBase: 0x1161,

  // one less than the beginning of the range of trailing consonants, which starts at 0x11a8
  TBase: 0x11a7,

  LCount,
  VCount,
  TCount,
  NCount, // 588

  // Total number of precomposed Hangul syllables (11172)
  SCount: LCount * NCount
};
