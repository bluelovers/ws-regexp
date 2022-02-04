"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.katakanize = exports.hiraganize = void 0;
const tslib_1 = require("tslib");
const kana_1 = require("./data/kana");
tslib_1.__exportStar(require("./data/kana"), exports);
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