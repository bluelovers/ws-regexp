// 3.12 Conjoining Jamo Behavior

const SBase = 0xac00;
const LBase = 0x1100;
const VBase = 0x1161;
const TBase = 0x11a7; // one less than the beginning of the range of trailing consonants
const LCount = 19;
// one more than the number of trailing consonants relevant to the decomposition algorithm: : (0x11C2 - 0x11A8 + 1) + 1
const VCount = 21;
const TCount = 28;
// number of precomposed Hangul syllables starting with the same leading consonant, counting both the LV_Syllables and the LVT_Syllables for each possible trailing consonant
const NCount = VCount * TCount; // 588
const SCount = LCount * NCount; // 11172 - total number of precomposed Hangul syllables

function arithmeticDecompositionMapingLV(s) {
  const SIndex = s - SBase;

  const LIndex = Math.floor(SIndex / NCount); // integer division rounded down
  const VIndex = Math.floor((SIndex % NCount) / TCount);
  const LPart = LBase + LIndex;
  const VPart = VBase + VIndex;
  return [LPart, VPart];
}

function arithmeticDecompositionMapingLVT(s) {
  const SIndex = s - SBase;

  const LVIndex = (SIndex / TCount) * TCount;
  const TIndex = SIndex % TCount;
  const LVPart = SBase + LVIndex;
  const TPart = TBase + TIndex;

  return [LVPart, TPart];
}

function fullCanonicalDecomposition(s) {
  const SIndex = s.charCodeAt(0) - SBase;

  const LIndex = Math.floor(SIndex / NCount);
  const VIndex = Math.floor((SIndex % NCount) / TCount);
  const TIndex = SIndex % TCount;
  const LPart = LBase + LIndex;
  const VPart = VBase + VIndex;

  if (TIndex > 0) {
    const TPart = TBase + TIndex;
    return [LPart, VPart, TPart];
  }

  return [LPart, VPart];
}

// const hexToUnicodeChar = hex => String.fromCodePoint(hex);

module.exports = {
  arithmeticDecompositionMapingLV,
  arithmeticDecompositionMapingLVT,
  fullCanonicalDecomposition
  //   hexToUnicodeChar
};
