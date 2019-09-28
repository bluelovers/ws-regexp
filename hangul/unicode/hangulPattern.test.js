const hangulPattern = require("./hangulPattern");
const { HANGUL } = require("./blocks");

const hangulBlockBoundaryRegex = () =>
  new RegExp(
    "[" +
      Object.entries(HANGUL)
        .map(
          ([, [start, stop]]) =>
            `\\u${start.toString(16)}-\\u${stop.toString(16)}`
        )
        .join("") +
      "]+",
    "g"
  );

describe("Hangul regular expression pattern used in text replacement", () => {
  test("should conform to known boundaries of Hangul Unicode blocks", () => {
    expect(hangulBlockBoundaryRegex()).toEqual(hangulPattern);
  });
});
