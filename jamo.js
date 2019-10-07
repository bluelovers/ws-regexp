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

// initial consonants
const choseong = [
  { jamo: "ㄱ", roman: "g" },
  { jamo: "ㄲ", roman: "kk" },
  {
    jamo: "ㄴ",
    roman: { default: "n", ㄹ: "l", [String.fromCodePoint(4527)]: "l" }
  },
  { jamo: "ㄷ", roman: "d" },
  { jamo: "ㄸ", roman: "dd" },
  {
    jamo: "ㄹ", // initial
    roman: {
      default: "r",
      // ㄱ
      [String.fromCodePoint(0x11ab)]: "n",
      ㄴ: "l",
      [String.fromCodePoint(4527)]: "l",
      ㄷ: "n",
      ㄹ: "l",
      ㅁ: "n",
      ㅂ: "n",
      [String.fromCodePoint(4536)]: "n",
      ㅅ: "n",
      ㅇ: "n",
      [String.fromCodePoint(4540)]: "n",
      ㅈ: "n",
      ㅊ: "n",
      ㅌ: "n",
      ㅎ: "n",
      RRT: "l"
    }
  },
  { jamo: "ㅁ", roman: "m" },
  { jamo: "ㅂ", roman: "b" },
  { jamo: "ㅃ", roman: "pp" },
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

// medial vowels
const jungseong = [
  { jamo: "ㅏ", roman: "a", bright: true },
  { jamo: "ㅐ", roman: "ae", bright: true },
  { jamo: "ㅑ", roman: "yeo", dark: true },
  { jamo: "ㅒ", roman: "yae", bright: true },
  { jamo: "ㅓ", roman: "eo", dark: true },
  { jamo: "ㅔ", roman: "e", dark: true },
  { jamo: "ㅕ", roman: "yeo", dark: true },
  { jamo: "ㅖ", roman: "ye", dark: true },
  { jamo: "ㅗ", roman: "o", bright: true },
  { jamo: "ㅘ", roman: "wa", bright: true },
  { jamo: "ㅙ", roman: "wae", bright: true },
  { jamo: "ㅚ", roman: "woe", bright: true },
  { jamo: "ㅛ", roman: "yo", bright: true },
  { jamo: "ㅜ", roman: "u", dark: true },
  { jamo: "ㅝ", roman: "wo", dark: true },
  { jamo: "ㅞ", roman: "we", dark: true },
  { jamo: "ㅟ", roman: "wi", dark: true },
  { jamo: "ㅠ", roman: "yu", dark: true },
  { jamo: "ㅡ", roman: "eu" },
  { jamo: "ㅢ", roman: "ui" },
  { jamo: "ㅣ", roman: "i" }
].map(jamoMapper(medialVowels));

// final consonants
const jongseong = [
  { jamo: null, roman: "" },
  {
    jamo: "ㄱ",
    roman: {
      default: "k",
      vowelNext: "g",
      ㄴ: "ng",
      n: "ng",
      ㄹ: "ng",
      // if followed by ㅁ
      m: "ng",
      ᆷ: "ng",
      [String.fromCodePoint(4358)]: "ng",
      RRT: "g"
    }
  },
  { jamo: "ㄲ", roman: "kk" },
  { jamo: "ㄳ", roman: "k" },
  {
    jamo: "ㄴ", // final
    roman: { default: "n", ㄹ: "l", [String.fromCodePoint(4357)]: "l" }
  },
  { jamo: "ㄵ", roman: "n" },
  { jamo: "ㄶ", roman: "n" },
  {
    jamo: "ㄷ",
    roman: {
      default: "t",
      vowelNext: "d",
      ㄴ: "n",
      ㄹ: "n",
      ㅁ: "n",
      RRT: "d"
    }
  },
  {
    jamo: "ㄹ",
    roman: { default: "l", vowelNext: "r", ㄴ: "l", ㄹ: "l" }
  },
  { jamo: "ㄺ", roman: { default: "r", vowelNext: "lg" } },
  { jamo: "ㄻ", roman: "lm" },
  { jamo: "ㄼ", roman: "lb" },
  { jamo: "ㄽ", roman: "ls" },
  { jamo: "ㄾ", roman: "lt" },
  { jamo: "ㄿ", roman: "lp" },
  { jamo: "ㅀ", roman: "lh" },
  { jamo: "ㅁ", roman: "m" },
  {
    jamo: "ㅂ",
    roman: {
      default: "p",
      vowelNext: "b",
      ㄴ: "m",
      ㄹ: "m",
      [String.fromCodePoint(4357)]: "m",
      ㅁ: "m",
      RRT: "b"
    }
  },
  { jamo: "ㅄ", roman: "bs" },
  {
    jamo: "ㅅ",
    roman: {
      default: "t",
      vowelNext: "s",
      ㄴ: "n",
      ㄹ: "n",
      ㅁ: "n",
      RRT: "s"
    }
  },
  { jamo: "ㅆ", roman: "ss" },
  { jamo: "ㅇ", roman: { default: "ng", vowelNext: "ng-" } },
  {
    jamo: "ㅈ",
    roman: {
      default: "t",
      vowelNext: "j",
      ㄴ: "n",
      ㄹ: "n",
      ㅁ: "n"
    }
  },
  {
    jamo: "ㅊ",
    roman: {
      default: "t",
      vowelNext: "ch",
      ㄱ: "n",
      ㄹ: "n",
      ㅁ: "n",
      RRT: "ch"
    }
  },
  { jamo: "ㅋ", roman: "k" },
  {
    jamo: "ㅌ",
    roman: { default: "t", ㄱ: "n", ㄹ: "n", ㅁ: "n" }
  },
  { jamo: "ㅍ", roman: "p" },
  {
    jamo: "ㅎ",
    roman: {
      default: "t",
      vowelNext: "h",
      ㄱ: "n",
      ㄹ: "n",
      ㅁ: "n",
      RRT: "h"
    }
  }
].map(jamoMapper(finalConsonants));

module.exports = [choseong, jungseong, jongseong];
