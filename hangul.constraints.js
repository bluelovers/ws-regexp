// Common constraints (based on the pseudocode provided in the Unicode spec)

const LCount = 19;
const VCount = 21;
const TCount = 28; // one more than the number of trailing consonants relevant to the decomposition algorithm: (0x11C2 - 0x11A8 + 1) + 1

/*
Number of precomposed Hangul syllables starting with the same leading consonant, counting both
- LV_Syllables and
- LVT_Syllables
for each possible trailing consonant
*/
const NCount = VCount * TCount; // 588

module.exports = {
  SBase: 0xac00,
  LBase: 0x1100,
  VBase: 0x1161,

  // one less than the beginning of the range of trailing consonants, which starts at 0x11a8
  TBase: 0x11a7,

  LCount,
  VCount,
  TCount,

  // Number of precomposed Hangul syllables
  NCount, // 588,

  // Total number of precomposed Hangul syllables (11172)
  SCount: LCount * NCount
};
