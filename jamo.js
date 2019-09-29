// "...what have the Romans ever done for us?"

const isHangul = require("./hangul/isHangul");

const [
  initialConsonants,
  medialVowels,
  finalConsonants
] = require("./hangul/unicode/hangul-jamo");

const explain = jamo => {
  const codePoint = jamo.codePointAt(0);
  return `${jamo} (${codePoint}/${codePoint.toString(16)})`;
};

const jamoMapper = jamoSet => ({ jamo, roman }, idx) => {
  const unicodeJamo = jamoSet[idx].jamo;
  // if (jamo && jamo !== unicodeJamo) {
  //   throw new Error(
  //     `${explain(jamo)}) does not match unicode ${explain(unicodeJamo)})`
  //   );
  // }
  const compatJamo =
    jamo &&
    jamo !== unicodeJamo &&
    isHangul(jamo) === "HANGUL_COMPATIBILITY_JAMO"
      ? jamo
      : undefined;
  const compatJamoHex = compatJamo
    ? compatJamo.codePointAt(0).toString(16)
    : undefined;
  return Object.assign(jamoSet[idx], { roman, compatJamo, compatJamoHex });
};

const choseong = [
  { jamo: "ㄱ", roman: "g" },
  { jamo: "ㄲ", roman: "gg" },
  { jamo: "ㄴ", roman: "n" },
  { jamo: "ㄷ", roman: "d" },
  { jamo: "ㄸ", roman: "dd" },
  { jamo: "ㄹ", roman: "r" },
  { jamo: "ㅁ", roman: "m" },
  { jamo: "ㅂ", roman: "b" },
  { jamo: "ㅃ", roman: "bb" },
  { jamo: "ㅅ", roman: "s" },
  { jamo: "ㅆ", roman: "ss" },
  { jamo: "ㅇ", roman: "" },
  { jamo: "ㅈ", roman: "j" },
  { jamo: "ㅉ", roman: "jj" },
  { jamo: "ㅊ", roman: "ch" },
  { jamo: "ㅋ", roman: "k" },
  { jamo: "ㅌ", roman: "t" },
  { jamo: "ㅍ", roman: "p" },
  { jamo: "ㅎ", roman: "h" }
].map(jamoMapper(initialConsonants));

const jungseong = [
  { jamo: "ㅏ", roman: "a" },
  { jamo: "ㅐ", roman: "ae" },
  { jamo: "ㅑ", roman: "yeo" },
  { jamo: "ㅒ", roman: "yae" },
  { jamo: "ㅓ", roman: "eo" },
  { jamo: "ㅔ", roman: "ye" },
  { jamo: "ㅕ", roman: "yeo" },
  { jamo: "ㅖ", roman: "ye" },
  { jamo: "ㅗ", roman: "o" },
  { jamo: "ㅘ", roman: "wa" },
  { jamo: "ㅙ", roman: "wae" },
  { jamo: "ㅚ", roman: "woe" },
  { jamo: "ㅛ", roman: "yo" },
  { jamo: "ㅜ", roman: "u" },
  { jamo: "ㅝ", roman: "wo" },
  { jamo: "ㅞ", roman: "we" },
  { jamo: "ㅟ", roman: "wi" },
  { jamo: "ㅠ", roman: "yu" },
  { jamo: "ㅡ", roman: "eu" },
  { jamo: "ㅢ", roman: "ui" },
  { jamo: "ㅣ", roman: "i" }
].map(jamoMapper(medialVowels));

const jongseong = [
  { jamo: null, roman: "" },
  { jamo: "ㄱ", roman: "k" },
  { jamo: "ㄲ", roman: "k" },
  { jamo: "ㄳ", roman: "k" },
  { jamo: "ㄴ", roman: "n" },
  { jamo: "ㄵ", roman: "n" },
  { jamo: "ㄶ", roman: "n" },
  { jamo: "ㄷ", roman: "d" },
  { jamo: "ㄹ", roman: "l" },
  { jamo: "ㄺ", roman: "r" },
  { jamo: "ㄻ", roman: "lm" },
  { jamo: "ㄼ", roman: "lb" },
  { jamo: "ㄽ", roman: "ls" },
  { jamo: "ㄾ", roman: "lt" },
  { jamo: "ㄿ", roman: "lp" },
  { jamo: "ㅀ", roman: "lh" },
  { jamo: "ㅁ", roman: "m" },
  { jamo: "ㅂ", roman: "b" },
  { jamo: "ㅄ", roman: "bs" },
  { jamo: "ㅅ", roman: "s" },
  { jamo: "ㅆ", roman: "ss" },
  { jamo: "ㅇ", roman: "ng" },
  { jamo: "ㅈ", roman: "j" },
  { jamo: "ㅊ", roman: "ch" },
  { jamo: "ㅋ", roman: "k" },
  { jamo: "ㅌ", roman: "t" },
  { jamo: "ㅍ", roman: "p" },
  { jamo: "ㅎ", roman: "h" }
].map(jamoMapper(finalConsonants));

module.exports = [choseong, jungseong, jongseong];
