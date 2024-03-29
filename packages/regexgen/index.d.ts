import { Trie } from './lib/trie';
/**
 * Generates a regular expression that matches the given input strings.
 * @param {Array<string>} inputs
 * @param {string} flags
 * @return {RegExp}
 */
export declare function regexgen(inputs: string[], flags?: string): RegExp;
export declare namespace regexgen {
    var Trie: typeof import("./lib/trie").Trie;
}
export { Trie };
export default regexgen;
