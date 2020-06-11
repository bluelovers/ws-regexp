"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceEmoji = exports.reEmojiGlobal = void 0;
const re_1 = require("./re");
exports.reEmojiGlobal = new RegExp(re_1.reEmoji.source, 'gu');
function replaceEmoji(text, fn, re = exports.reEmojiGlobal) {
    return text.replace(re, fn);
}
exports.replaceEmoji = replaceEmoji;
//# sourceMappingURL=util.js.map