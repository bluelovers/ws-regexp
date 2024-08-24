import { Alternation, CharClass, Concatenation, Repetition, Literal } from './ast';
import { State } from './state';
/**
 * Implements Brzozowski's algebraic method to convert a DFA into a regular
 * expression pattern.
 * http://cs.stackexchange.com/questions/2016/how-to-convert-finite-automata-to-regular-expressions#2392
 *
 * @param {State} root - the initial state of the DFA
 * @param {string} flags - The flags to add to the regex.
 * @return {String} - the converted regular expression pattern
 */
export declare function toRegex(root: State, flags: string): string;
/**
 * Creates a repetition if `exp` exists.
 */
export declare function star(exp: any): Repetition;
/**
 * Creates a union between two expressions
 */
export declare function union(a: any, b: any): Repetition | CharClass | Alternation | Concatenation;
/**
 * Removes the common prefix or suffix from the two expressions
 */
export declare function removeCommonSubstring(a: Literal | Concatenation, b: Literal | Concatenation, side: 'start' | 'end'): [Literal | Concatenation, Literal | Concatenation, string];
/**
 * Finds the common prefix or suffix between to strings
 */
export declare function commonSubstring(a: any, b: any, side?: 'start' | 'end'): string;
/**
 * Creates a concatenation between expressions a and b
 */
export declare function concat(a: Literal, b: Literal): Literal | Concatenation;
export default toRegex;
