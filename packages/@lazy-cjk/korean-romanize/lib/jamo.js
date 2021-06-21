"use strict";
// "...what have the Romans ever done for us?"
const tslib_1 = require("tslib");
const isHangul_1 = tslib_1.__importDefault(require("./hangul/isHangul"));
const hangul_jamo_1 = tslib_1.__importDefault(require("./hangul/unicode/hangul-jamo"));
const fromPairs = pairs => pairs.reduce((cache, pair) => {
    cache[pair[0]] = pair[1];
    return cache;
}, {});
const [initialConsonants, medialVowels, finalConsonants,] = hangul_jamo_1.default;
const jamoMapper = jamoSet => ({ jamo, roman }, idx) => {
    const unicodeJamo = jamoSet[idx].jamo;
    const compatJamo = jamo &&
        jamo !== unicodeJamo &&
        isHangul_1.default(jamo) === "HANGUL_COMPATIBILITY_JAMO"
        ? jamo
        : undefined;
    const compatJamoHex = compatJamo
        ? compatJamo.codePointAt(0).toString(16)
        : undefined;
    return Object.assign(jamoSet[idx], { roman, compatJamo, compatJamoHex });
};
// initial consonants
const choseong = [
    { jamo: "ㄱ", roman: { default: "g", MR: "k" } },
    { jamo: "ㄲ", roman: "kk" },
    {
        jamo: "ㄴ",
        roman: {
            default: "n",
            ㄹ: "l",
            [String.fromCodePoint(4527)]: "l",
        },
    },
    {
        jamo: "ㄷ",
        roman: {
            default: "d",
            ㄵ: "dd",
            // ㄶ: "",
            ㄼ: "dd",
        },
    },
    { jamo: "ㄸ", roman: "tt" },
    {
        jamo: "ㄹ",
        roman: {
            default: "r",
            // ㄱ
            ㄴ: "l",
            [String.fromCodePoint(0x11ab)]: "l",
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
            RRT: "l",
        },
    },
    { jamo: "ㅁ", roman: "m" },
    { jamo: "ㅂ", roman: "b" },
    { jamo: "ㅃ", roman: "pp" },
    { jamo: "ㅅ", roman: "s" },
    { jamo: "ㅆ", roman: "ss" },
    {
        jamo: "ㅇ",
        roman: {
            default: "",
            ㄵ: "j",
            // ㄶ: "",
            ㄼ: "b",
        },
    },
    { jamo: "ㅈ", roman: "j" },
    { jamo: "ㅉ", roman: "jj" },
    { jamo: "ㅊ", roman: "ch" },
    {
        jamo: "ㅋ",
        roman: {
            default: "k",
            MR: "k'",
        },
    },
    { jamo: "ㅌ", roman: "t" },
    { jamo: "ㅍ", roman: "p" },
    { jamo: "ㅎ", roman: "h" },
].map(jamoMapper(initialConsonants));
// medial vowels
const jungseong = [
    { jamo: "ㅏ", roman: "a", bright: true },
    { jamo: "ㅐ", roman: "ae", bright: true },
    { jamo: "ㅑ", roman: "ya", dark: true },
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
    { jamo: "ㅣ", roman: "i" },
].map(jamoMapper(medialVowels));
const assimilate = (jamos, sound) => fromPairs(jamos.map(jamo => [jamo, sound]));
const nasalAssimilators = [
    "ㄴ",
    String.fromCodePoint(0x1102),
    "n",
    "ㅁ",
    String.fromCodePoint(0x1106),
    "m",
    "ㅇ",
    String.fromCodePoint(0x110b),
];
// nasal assimilation/nasalization when followed by ㅁ, ㄴ
const nasalAssimilation = {
    // 	ㅂ ㅍ ㅄ ㄿ ㄼ => ㅁ
    trailingBM: assimilate(nasalAssimilators, "m"),
    // ㄷ ㅌ ㅈ ㅊ ㅅ ㅆ ㅎ => ㄴ
    trailingDN: assimilate(nasalAssimilators, "n"),
    // ㄱ ㅋ ㄲ ㄳ ㄺ => ㅇ
    trailingGNg: assimilate(nasalAssimilators, "ng"),
};
// final consonants
const jongseong = [
    { jamo: null, roman: "" },
    {
        jamo: "ㄱ",
        roman: {
            default: "k",
            vowelNext: "g",
            ㄹ: "ng",
            [String.fromCodePoint(0x1105)]: "ng",
            ...nasalAssimilation.trailingGNg,
            RRT: "g",
        },
    },
    {
        jamo: "ㄲ",
        roman: { default: "kk", RRT: "kk", ...nasalAssimilation.trailingGNg },
    },
    { jamo: "ㄳ", roman: { default: "k", ...nasalAssimilation.trailingGNg } },
    {
        jamo: "ㄴ",
        roman: {
            default: "n",
            ㄱ: "n",
            [String.fromCodePoint(0x1100)]: "n",
            ㄹ: "l",
            [String.fromCodePoint(4357)]: "l",
        },
    },
    { jamo: "ㄵ", roman: "n" },
    { jamo: "ㄶ", roman: "n" },
    {
        jamo: "ㄷ",
        roman: {
            default: "t",
            vowelNext: "d",
            ㄹ: "n",
            ...nasalAssimilation.trailingDN,
            RRT: "d",
        },
    },
    {
        jamo: "ㄹ",
        roman: { default: "l", RRT: "l", vowelNext: "r", ㄴ: "l", ㄹ: "l" },
    },
    {
        jamo: "ㄺ",
        roman: { default: "r", vowelNext: "lg", ...nasalAssimilation.trailingGNg },
    },
    { jamo: "ㄻ", roman: "lm" },
    { jamo: "ㄼ", roman: { default: "lb", ...nasalAssimilation.trailingBM } },
    { jamo: "ㄽ", roman: "ls" },
    { jamo: "ㄾ", roman: "lt" },
    { jamo: "ㄿ", roman: { default: "lp", ...nasalAssimilation.trailingBM } },
    { jamo: "ㅀ", roman: "lh" },
    { jamo: "ㅁ", roman: "m" },
    {
        jamo: "ㅂ",
        roman: {
            default: "p",
            vowelNext: "b",
            ㄹ: "m",
            [String.fromCodePoint(0x1105)]: "m",
            ...nasalAssimilation.trailingBM,
            RRT: "b",
        },
    },
    {
        jamo: "ㅄ",
        roman: { default: "bs", RRT: "bs", ...nasalAssimilation.trailingBM },
    },
    {
        jamo: "ㅅ",
        roman: {
            default: "t",
            vowelNext: "s",
            ㄹ: "n",
            ...nasalAssimilation.trailingDN,
            RRT: "s",
        },
    },
    {
        jamo: "ㅆ",
        roman: {
            default: "ss",
            ...nasalAssimilation.trailingDN,
        },
    },
    {
        jamo: "ㅇ",
        roman: {
            default: "ng",
            vowelNext: "ng-",
        },
    },
    {
        jamo: "ㅈ",
        roman: {
            default: "t",
            vowelNext: "j",
            ㄹ: "n",
            ...nasalAssimilation.trailingDN,
        },
    },
    {
        jamo: "ㅊ",
        roman: {
            default: "t",
            vowelNext: "ch",
            ㄱ: "n",
            ㄹ: "n",
            ...nasalAssimilation.trailingDN,
            RRT: "ch",
        },
    },
    {
        jamo: "ㅋ",
        roman: {
            default: "k",
            RRT: "k",
            ...nasalAssimilation.trailingGNg,
        },
    },
    {
        jamo: "ㅌ",
        roman: {
            default: "t",
            ㄹ: "n",
            ...nasalAssimilation.trailingDN,
        },
    },
    { jamo: "ㅍ", roman: { default: "p", ...nasalAssimilation.trailingBM } },
    {
        jamo: "ㅎ",
        roman: {
            default: "t",
            vowelNext: "h",
            ㄱ: "n",
            ㄹ: "n",
            ㅁ: "n",
            RRT: "h",
        },
    },
].map(jamoMapper(finalConsonants));
module.exports = [choseong, jungseong, jongseong];
//# sourceMappingURL=jamo.js.map