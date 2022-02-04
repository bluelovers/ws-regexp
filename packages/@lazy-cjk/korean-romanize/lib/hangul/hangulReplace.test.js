"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const hangulReplace_1 = tslib_1.__importDefault(require("./hangulReplace"));
const testCases = [
    {
        text: "창세가 is a shamanistic creation myth from 함훙, 함경도.",
        hangulWords: ["창세가", "함훙", "함경도"],
    },
    {
        text: "천지왕본풀이 is a shamanistic creation myth from 제주도.",
        hangulWords: ["천지왕본풀이", "제주도"],
    },
    {
        text: "마고할미 is a creation myth from the 관북 region of 함경북도.",
        hangulWords: ["마고할미", "관북", "함경북도"],
    },
    {
        text: "시루말 is a shamanistic creation myth from 오산, 경기도.",
        hangulWords: ["시루말", "오산", "경기도"],
    },
];
describe("hangul replacer", () => {
    testCases.forEach(({ text, hangulWords }) => {
        test(`should find [${hangulWords.join(", ")}] in "${text}"`, () => {
            const mockCallback = jest.fn();
            (0, hangulReplace_1.default)(text, mockCallback);
            hangulWords.forEach((word, idx) => {
                expect(mockCallback.mock.calls[idx][0] === word);
            });
        });
    });
    test(`should find nothing in a given Japanese sentence`, () => {
        const nara = "8世紀初頭から末にかけては奈良時代と呼ばれ、奈良に都城（平城京）が置かれた。";
        const mockCallback = jest.fn();
        (0, hangulReplace_1.default)(nara, mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });
    test(`should find nothing in a given English sentence`, () => {
        const seoJaePil = "One of the first Korean Americans was Seo Jae-pil, or Philip Jaisohn, who came to America shortly after participating in an abortive coup with other progressives to institute political reform in 1884. He became a citizen in 1890 and earned a medical degree in 1892 from what is now George Washington University.";
        const mockCallback = jest.fn();
        (0, hangulReplace_1.default)(seoJaePil, mockCallback);
        expect(mockCallback).not.toHaveBeenCalled();
    });
});
//# sourceMappingURL=hangulReplace.test.js.map