"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports._build = _build;
const tslib_1 = require("tslib");
const regexgen2_1 = require("regexgen2");
const emoji_json_1 = tslib_1.__importDefault(require("emoji.json"));
function _build(emojiJson) {
    const trie = new regexgen2_1.Trie();
    trie.addAll(emoji_json_1.default.map(v => v.char));
    const reEmoji = new RegExp(trie.toString('u'), 'u');
    const entriesEmoji = emoji_json_1.default
        .map(({ char, name }) => [char, name]);
    return {
        reEmoji,
        entriesEmoji,
    };
}
//# sourceMappingURL=core.js.map