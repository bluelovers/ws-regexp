"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Trie = exports.regexgen = void 0;
const trie_1 = __importDefault(require("./lib/trie"));
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