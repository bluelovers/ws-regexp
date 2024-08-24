// Common constraints (based on the pseudocode provided in the Unicode spec)

export const SBase = 0xac00
export const LBase = 0x1100
export const VBase = 0x1161

/**
 * one less than the beginning of the range of trailing consonants, which starts at 0x11a8
 */
export const TBase = 0x11a7

/**
 * number of lead consonants in Hangul
 * @type {number}
 */
export const LCount = 19;

/**
 * Number of LV_Syllables per each leading consonant
 */
export const VCount = 21; // i.e. number of vowels in Hangul

/**
 * Number of LVT_Syllables per each possible trailing consonant
 */
export const TCount = 28; // ie. the number of letters in Hangul

/**
 * Number of precomposed Hangul syllables
 */
export const NCount = VCount * TCount; // VCount * TCount = 588

/**
 * Total number of precomposed Hangul syllables (11172)
 */
export const SCount = LCount * NCount
