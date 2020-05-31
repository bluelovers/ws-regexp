"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const hangulPattern_1 = __importDefault(require("./hangulPattern"));
const HANGUL_BLOCKS = Object.entries(require("./blocks")).filter(([blockName]) => blockName.startsWith("HANGUL"));
const hangulBlockBoundaryRegex = () => new RegExp("[" +
    HANGUL_BLOCKS.map(([, [start, stop]]) => `\\u${start.toString(16)}-\\u${stop.toString(16)}`).join("") +
    "]+", "g");
describe("Hangul regular expression pattern used in text replacement", () => {
    test("should conform to known boundaries of Hangul Unicode blocks", () => {
        expect(hangulBlockBoundaryRegex()).toEqual(hangulPattern_1.default);
    });
});
//# sourceMappingURL=hangulPattern.test.js.map