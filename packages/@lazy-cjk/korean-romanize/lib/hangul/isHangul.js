"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHangul = void 0;
const blocks_1 = __importDefault(require("./unicode/blocks"));
const hangulBlocks = Object.entries(blocks_1.default)
    .filter(([blockName]) => blockName.startsWith("HANGUL"));
/**
 * Check whether a provided character belongs to a Hangul Unicode block
 *
 * Returns null if input is not a string.
 *
 * @param {*} char
 * @param {blocks}
 */
function isHangul(char, blocks = hangulBlocks) {
    if (typeof char !== "string") {
        return null;
    }
    const codePoint = char.codePointAt(0);
    // @ts-ignore
    for (const [block, [start, end]] of blocks) {
        if (codePoint >= start && codePoint <= end) {
            return block;
        }
    }
    return false;
}
exports.isHangul = isHangul;
exports.default = isHangul;
//# sourceMappingURL=isHangul.js.map