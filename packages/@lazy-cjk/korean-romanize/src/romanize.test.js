const {
  searchJamo,
  romanize,
  romanizeWord
} = require("./romanize");
const words = Object.entries(require("../test").words);

describe("romanizeWord function", () => {
  describe("should romanize simple words", () => {
    words
      .filter(([, { RR, tags }]) => RR && tags && tags.includes("simple"))
      .forEach(([hangulWord, { RR }]) => {
        test(`${hangulWord} to ${RR}`, () => {
          expect(romanizeWord(hangulWord)).toBe(RR);
        });
      });
  });

  describe("should transcribe plosives/stops ㄱ, ㄷ, and ㅂ as 'g', 'd', and 'b' before a vowel and as 'k', 't', and 'p' when before another consonant or as the last sound of a word", () => {
    words
      .filter(([, { RR, tags }]) => RR && tags && tags.includes("plosives"))
      .forEach(([hangulWord, { RR }]) => {
        test(`${hangulWord} to ${RR}`, () => {
          expect(romanizeWord(hangulWord)).toBe(RR.toLowerCase());
        });
      });
  });

  describe("should words with adjacent consonant assimilation", () => {
    words
      .filter(([, { RR, tags }]) => RR && tags && tags.includes("assimilation"))
      .forEach(([hangulWord, { RR }]) => {
        test(`${hangulWord} to ${RR}`, () => {
          expect(romanizeWord(hangulWord, "RR")).toBe(RR.toLowerCase());
        });
      });
  });

  describe("should transliterate", () => {
    words
      .filter(([, { RRT }]) => RRT)
      .forEach(([hangulWord, { RRT }]) => {
        test(`${hangulWord} to ${RRT}`, () => {
          expect(romanizeWord(hangulWord, { method: "RRT" })).toBe(
            RRT.toLowerCase()
          );
        });
      });
  });
});

describe("romanize function", () => {
  test("should romanize Hangul string with spaces", () => {
    expect(romanize("국어의 로마자 표기법")).toBe("gugeoui romaja pyogibeop");
  });

  test("should romanize 로마자 as romaja", () => {
    expect(romanize("The Korean word for Latin letters is 로마자.")).toBe(
      "The Korean word for Latin letters is romaja."
    );
  });

  test("should romanize only Hangul parts of a given string", () => {
    expect(
      romanize(
        'The Revised Romanization of Korean (국어의 로마자 표기법; 國語의 로마字 表記法; gugeoui romaja pyogibeop. op; lit. "Roman-letter notation of the national language") is the official Korean language romanization system in South Korea.'
      )
    ).toBe(
      'The Revised Romanization of Korean (gugeoui romaja pyogibeop; 國語ui roma字 表記法; gugeoui romaja pyogibeop. op; lit. "Roman-letter notation of the national language") is the official Korean language romanization system in South Korea.'
    );
  });
});

describe("searchJamo function", () => {
  test("should throw an error if not supplied with a node to search", () => {
    expect(() => searchJamo()).toThrow();
  });
});
