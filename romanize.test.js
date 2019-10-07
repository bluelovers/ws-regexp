const { syllableParser, romanize, romanizeWord } = require("./romanize");
const translations = require("./translations");

const simpleWords = {
  가: "ga",
  나: "na",
  다: "da",
  로마자: "romaja",
  표기법: "pyogibeop",
  국어의: "gugeoui",
  만남: "mannam",
  동무: "dongmu",
  친구: "chingu"
};

const plosiveCases = {
  구미: "Gumi",
  영동: "Yeongdong",
  백암: "Baegam",
  옥천: "Okcheon",
  합덕: "Hapdeok",
  호법: "Hobeop",
  월곶: "Wolgot", // [월곧]
  벚꽃: "beotkkot", // [벋꼳]
  한밭: "Hanbat" // [한받]
};

const wordsWithAdjacentConsonantAssimilation = {
  백마: "Baengma", // [뱅마]
  // 신문로: "Sinmunno", // [신문노]
  종로: "Jongno", // [종노]
  왕십리: "Wangsimni", // [왕심니]
  별내: "Byeollae" // [별래]
  // 신라: "Silla" // [실라]
};

const transliterationCases = {
  집: "jib",
  짚: "jip",
  밖: "bakk",
  값: "gabs",
  붓꽃: "buskkoch",
  먹는: "meogneun",
  독립: "doglib",
  // 문리: "munli",
  // 물엿: "mul-yeos",
  // 굳이: "gud-i",
  좋다: "johda",
  가곡: "gagog",
  조랑말: "jolangmal"
  // 없었습니다: "eobs-eoss-seubnida"
};

describe("romanizeWord function", () => {
  describe("should romanize simple words", () => {
    Object.entries(simpleWords).forEach(([hangulWord, expectedRomaja]) => {
      test(`${hangulWord} to ${expectedRomaja}`, () => {
        expect(romanizeWord(hangulWord)).toBe(expectedRomaja);
      });
    });
  });

  describe("should transcribe plosives/stops ㄱ, ㄷ, and ㅂ as 'g', 'd', and 'b' before a vowel and as 'k', 't', and 'p' when before another consonant or as the last sound of a word", () => {
    Object.entries(plosiveCases).forEach(([hangulWord, expectedRomaja]) => {
      test(`${hangulWord} to ${expectedRomaja}`, () => {
        expect(romanizeWord(hangulWord)).toBe(expectedRomaja.toLowerCase());
      });
    });
  });

  describe("should words with adjacent consonant assimilation", () => {
    Object.entries(wordsWithAdjacentConsonantAssimilation).forEach(
      ([hangulWord, expectedRomaja]) => {
        test(`${hangulWord} to ${expectedRomaja}`, () => {
          expect(romanizeWord(hangulWord)).toBe(expectedRomaja.toLowerCase());
        });
      }
    );
  });

  describe("should transliterate", () => {
    Object.entries(transliterationCases).forEach(
      ([hangulWord, expectedRomaja]) => {
        test(`${hangulWord} to ${expectedRomaja}`, () => {
          expect(romanizeWord(hangulWord, "RRT")).toBe(expectedRomaja);
        });
      }
    );
  });

  // describe("should romanize adjacent consonant assimilation", () => {
  //   Object.entries(wordsWithAdjacentConsonantAssimilation).forEach(
  //     ([hangulWord, expectedRomaja]) => {
  //       test(`in ${hangulWord} to ${expectedRomaja.toLowerCase()}`, () => {
  //         expect(romanizeWord(hangulWord)).toBe(expectedRomaja.toLowerCase());
  //       });
  //     }
  //   );
  // });
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
