"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = exports.regexgen = void 0;
const trie_1 = require("./lib/trie");
Object.defineProperty(exports, "Trie", { enumerable: true, get: function () { return trie_1.Trie; } });
/**
 * Generates a regular expression that matches the given input strings.
 * @param {Array<string>} inputs
 * @param {string} flags
 * @return {RegExp}
 */
function regexgen(inputs, flags) {
    let trie = new trie_1.Trie;
    trie.addAll(inputs);
    return trie.toRegExp(flags);
}
exports.regexgen = regexgen;
regexgen.Trie = trie_1.Trie;
exports.default = regexgen;
//# sourceMappingURL=index.js.map