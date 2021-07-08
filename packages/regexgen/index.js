"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = exports.regexgen = void 0;
const tslib_1 = require("tslib");
const trie_1 = (0, tslib_1.__importDefault)(require("./lib/trie"));
exports.Trie = trie_1.default;
/**
 * Generates a regular expression that matches the given input strings.
 * @param {Array<string>} inputs
 * @param {string} flags
 * @return {RegExp}
 */
function regexgen(inputs, flags) {
    let trie = new trie_1.default;
    trie.addAll(inputs);
    return trie.toRegExp(flags);
}
exports.regexgen = regexgen;
regexgen.Trie = trie_1.default;
exports.default = regexgen;
//# sourceMappingURL=index.js.map