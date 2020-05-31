"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = exports.transliterate = void 0;
const core_1 = require("./lib/core");
const emoji_1 = require("./lib/emoji");
const chinese_1 = require("./lib/chinese");
const transliterate_1 = __importDefault(require("@sindresorhus/transliterate"));
function _text(word, options) {
    if (options.emoji) {
        word = emoji_1._replaceEmoji(word, options);
    }
    word = chinese_1._replaceChinese(word, options);
    if (options.transliterate) {
        word = transliterate_1.default(word);
    }
    return word;
}
function transliterate(word, options) {
    options = core_1.handleOptions(options);
    options = {
        ...options,
    };
    options.separator = ' ';
    word = _text(word, options);
    word = core_1._coreCase(word, options);
    return word
        .replace(/\s+/g, ' ');
}
exports.transliterate = transliterate;
function slugify(word, options) {
    options = core_1.handleOptions(options);
    word = _text(word, options);
    return core_1._core(word, options);
}
exports.slugify = slugify;
exports.default = slugify;
//# sourceMappingURL=index.js.map