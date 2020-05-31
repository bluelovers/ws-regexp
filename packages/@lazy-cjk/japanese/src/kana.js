"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.katakanize = exports.hiraganize = void 0;
const kana_1 = require("./data/kana");
__exportStar(require("./data/kana"), exports);
const chr = String.fromCharCode;
const ord = function (char) {
    return char.charCodeAt(0);
};
/**
 * Convert input katakana into hiragana.
 */
function hiraganize(string) {
    return string.replace(kana_1.katakanaRegex, function (katakana) {
        if (katakana.match(/^[\u30a1-\u30f4\u30fd\u30fe]$/)) {
            return chr(ord(katakana) - ord('ァ') + ord('ぁ'));
        }
        else if (kana_1.specialHiraganizationTable[katakana]) {
            return kana_1.specialHiraganizationTable[katakana];
        }
    });
}
exports.hiraganize = hiraganize;
/**
 * Convert input hiragana into katakana.
 */
function katakanize(string) {
    return string.replace(kana_1.hiraganaRegex, function (hiragana) {
        if (hiragana.match(/^[\u3041-\u3094\u309d\u309e]$/)) {
            return chr(ord(hiragana) - ord('ぁ') + ord('ァ'));
        }
        else if (kana_1.specialKatakanizationTable[hiragana]) {
            return kana_1.specialKatakanizationTable[hiragana];
        }
    });
}
exports.katakanize = katakanize;
//# sourceMappingURL=kana.js.map