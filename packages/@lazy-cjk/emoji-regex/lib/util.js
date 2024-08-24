"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reEmojiGlobal = void 0;
exports.replaceEmoji = replaceEmoji;
const re_1 = require("./re");
exports.reEmojiGlobal = new RegExp(re_1.reEmoji.source, 'gu');
function replaceEmoji(text, fn, re = exports.reEmojiGlobal) {
    return text.replace(re, fn);
}
//# sourceMappingURL=util.js.map