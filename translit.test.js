const { translit } = require("./translit");
const translations = require("./translations");

const unhyphenate = str =>
  str
    .split("")
    .filter(char => char !== "-" && char !== " ")
    .join("");

describe("translit function", () => {
  test("should transliterate 동무 to dong-mu", () => {
    expect(translit("동무")).toBe("dongmu");
  });

  test("should transliterate 내 나라 to nae na-ra", () => {
    expect(translit("내 나라")).toBe("nae nara");
  });

  test("should transliterate 월남하다 to wol-nam-ha-da", () => {
    expect(translit("월남하다")).toBe("wolnamhada");
  });

  test("should transliterate 만남 to man-nam", () => {
    expect(translit("만남")).toBe("mannam");
  });

  Object.entries(translations).forEach(([geulja, { rrt }]) => {
    if (rrt) {
      test(`should properly transliterate ${geulja}`, () => {
        // TODO test is modified to ignore hyphen usage

        expect(unhyphenate(translit(geulja)).toLowerCase()).toBe(
          unhyphenate(rrt).toLowerCase()
        );
      });
    }
  });
});
