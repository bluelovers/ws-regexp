"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHangul = isHangul;
const tslib_1 = require("tslib");
const unicodeBlocks = tslib_1.__importStar(require("./unicode/blocks"));
const hangulBlocks = Object.entries(unicodeBlocks)
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
exports.default = isHangul;
//# sourceMappingURL=isHangul.js.map