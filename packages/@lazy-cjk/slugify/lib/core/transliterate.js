"use strict";
/**
 * Created by user on 2020/6/2.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports._text = void 0;
const tslib_1 = require("tslib");
const emoji_1 = require("../emoji");
const cjk_1 = require("../cjk");
const transliterate_1 = tslib_1.__importDefault(require("@sindresorhus/transliterate"));
const regex_pinyin_1 = require("@regexp-cjk/regex-pinyin");
const reStrip = new RegExp(`[${regex_pinyin_1.reNotPinyinChar.source.replace(/^\[|\]$/g, '')}\u0020]+`, 'ug');
function _text(word, options) {
    var _a, _b;
    if (options.emoji) {
        word = (0, emoji_1._replaceEmoji)(word, options);
    }
    if ((_a = options.transliterate) !== null && _a !== void 0 ? _a : true) {
        word = (0, transliterate_1.default)(word);
    }
    if ((_b = options.cjk) !== null && _b !== void 0 ? _b : true) {
        word = (0, cjk_1._replaceCjk)(word, options);
    }
    if (!options.noStripOthers) {
        word = word
            .replace(reStrip, ' ');
    }
    word = word
        .replace(/[\s\u00a0]/g, ' ');
    return word;
}
exports._text = _text;
//# sourceMappingURL=transliterate.js.map