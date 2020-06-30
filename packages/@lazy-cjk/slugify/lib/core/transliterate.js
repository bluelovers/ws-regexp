"use strict";
/**
 * Created by user on 2020/6/2.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._text = void 0;
const emoji_1 = require("../emoji");
const cjk_1 = require("../cjk");
const transliterate_1 = __importDefault(require("@sindresorhus/transliterate"));
const regex_pinyin_1 = require("@regexp-cjk/regex-pinyin");
const reStrip = new RegExp(`[${regex_pinyin_1.reNotPinyinChar.source.replace(/^\[|\]$/g, '')} ]+`, 'ug');
function _text(word, options) {
    var _a, _b;
    if (options.emoji) {
        word = emoji_1._replaceEmoji(word, options);
    }
    if ((_a = options.transliterate) !== null && _a !== void 0 ? _a : true) {
        word = transliterate_1.default(word);
    }
    if ((_b = options.cjk) !== null && _b !== void 0 ? _b : true) {
        word = cjk_1._replaceCjk(word, options);
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