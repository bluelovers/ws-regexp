module.exports = {
  // simple vowels
  ㅏ: "a",
  ㅓ: { rr: "eo", mr: "ŏ" },
  ㅗ: "o",
  ㅜ: "u",
  ㅡ: { rr: "eu", mr: "ŭ" },
  ㅣ: "i",
  ㅐ: "ae",
  ㅔ: "e",
  ㅚ: { rr: "oe" },
  ㅟ: { rr: "w" },
  // Diphtongs
  ㅑ: "ya",
  ㅕ: { rr: "yeo", mr: "yŏ" },
  ㅛ: "yo",
  ㅠ: "yu",
  ㅒ: "yae",
  ㅖ: "ye",
  ㅘ: "wa",
  ㅙ: "wae",
  ㅟ: "wi",
  ㅝ: { rr: "wo", mr: "wŏ" },
  ㅞ: "we",
  ㅢ: { rr: "ui", mr: "ŭi" },
  // Plosives (stops)
  ㄱ: {
    rr: [
      "g",
      {
        default: "k",
        ㅇ: "g",
        ㄴ: "ngn",
        ㄹ: "ngn",
        ㅁ: "ngm",
        ㅎ: "kh, k"
      }
    ],
    mr: "k"
  },
  ㄲ: ["kk", "k"],
  ㅋ: "k",
  ㄷ: [
    "d",
    {
      default: "t",
      ㅇ: ["d", "j"],
      ㄴ: "nn",
      ㄹ: "nn",
      ㅁ: "nm",
      ㅌ: "t-t",
      ㅎ: ["th", "t", "ch"]
    }
  ],
  ㄸ: "tt",
  ㅌ: [
    "t",
    {
      default: "t",
      ㅇ: ["t", "ch"],
      ㄴ: "nn",
      ㄹ: "nn",
      ㅁ: "nm",
      ㅌ: "t-t",
      ㅎ: ["th", "t", "ch"]
    }
  ],
  ㅂ: [
    "b",
    { default: "p", ㅇ: "b", ㄴ: "mn", ㄹ: "mn", ㅁ: "mm", ㅎ: ["ph", "p"] }
  ],
  ㅃ: "pp",
  ㅍ: "p",
  // Affricates
  ㅈ: [
    "j",
    {
      default: "t",
      ㄴ: "nn",
      ㄹ: "nn",
      ㅁ: "nm",
      ㅌ: "t-t",
      ㅎ: ["th", "t", "ch"]
    }
  ],
  ㅉ: "jj",
  ㅊ: [
    "ch",
    {
      default: "t",
      ㅇ: "ch",
      ㄴ: "nn",
      ㄹ: "nn",
      ㅁ: "nm",
      ㅌ: "t-t",
      ㅎ: ["th", "t", "ch"]
    }
  ],
  // Fricatives
  ㅅ: ["s", { default: "s", ㅇ: "s", ㄴ: "nn", ㄹ: "nn", ㅁ: "nm" }],
  ㅆ: "ss",
  ㅎ: ["h", { default: "h", ㅇ: "h", ㄴ: "nn", ㄹ: "nn", ㅁ: "nm" }],
  // Nasals
  ㄴ: ["n", { default: "n", ㄱ: "n-g", ㄹ: ["ll", "nn"] }],
  ㅁ: "m",
  ㅇ: [null, { default: "ng", ㅇ: "ng-", ㄹ: "ngn" }],
  // Liquids
  ㄹ: ["r", "l"],
  // composite jamo
  ㄺ: "lg",
  null: ""
};
