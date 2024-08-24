"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const hangulPattern_1 = require("./hangulPattern");
const CACHE_BLOCKS = tslib_1.__importStar(require("./blocks"));
const HANGUL_BLOCKS = Object.entries(CACHE_BLOCKS).filter(([blockName]) => blockName.startsWith("HANGUL"));
const hangulBlockBoundaryRegex = () => new RegExp("[" +
    HANGUL_BLOCKS.map(([, [start, stop]]) => `\\u${start.toString(16)}-\\u${stop.toString(16)}`).join("") +
    "]+", "g");
describe("Hangul regular expression pattern used in text replacement", () => {
    test("should conform to known boundaries of Hangul Unicode blocks", () => {
        expect(hangulBlockBoundaryRegex()).toEqual(hangulPattern_1.hangulPattern);
    });
});
//# sourceMappingURL=hangulPattern.test.js.map