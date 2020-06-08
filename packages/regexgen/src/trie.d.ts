import State from './state';
/**
 * A Trie represents a set of strings in a tree data structure
 * where each edge represents a single character.
 * https://en.wikipedia.org/wiki/Trie
 */
export declare class Trie {
    alphabet: Set<string>;
    root: State;
    constructor();
    /**
     * Adds the given string to the trie.
     * @param {string} string - the string to add
     */
    add(string: string): void;
    /**
     * Adds the given array of strings to the trie.
     * @param {Array<string>} strings - the array of strings to add
     */
    addAll(strings: string[]): void;
    /**
     * Returns a minimal DFA representing the strings in the trie.
     * @return {State} - the starting state of the minimal DFA
     */
    minimize(): State;
    /**
     * Returns a regex pattern that matches the strings in the trie.
     * @param {string} flags - The flags to add to the regex.
     * @return {string} pattern - The regex pattern.
     */
    toString(flags?: string): string;
    /**
     * Returns a regex that matches the strings in the trie.
     * @param {string} flags - The flags to add to the regex.
     * @return {RegExp}
     */
    toRegExp(flags?: string): RegExp;
}
export default Trie;
