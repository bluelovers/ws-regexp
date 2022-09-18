import { CapturingGroup, CharacterClass, Disjunction, Flags, Group, LookaroundAssertion, Pattern, RegExpLiteral } from "./ast";
import { EnumEcmaVersion } from './const';
export type AppendableNode = Pattern | Disjunction | Group | CapturingGroup | CharacterClass | LookaroundAssertion;
export declare namespace RegExpParser {
    /**
     * The options for RegExpParser construction.
     */
    interface Options {
        /**
         * The flag to disable Annex B syntax. Default is `false`.
         */
        strict?: boolean;
        /**
         * ECMAScript version. Default is `2018`.
         * - `2015` added `u` and `y` flags.
         * - `2018` added `s` flag, Named Capturing Group, Lookbehind Assertion,
         *   and Unicode Property Escape.
         */
        ecmaVersion?: EnumEcmaVersion;
        disableChkCharacterClassRange?: boolean;
    }
}
export declare class RegExpParser {
    private _state;
    private _validator;
    /**
     * Initialize this parser.
     * @param options The options of parser.
     */
    constructor(options?: RegExpParser.Options);
    /**
     * Parse a regular expression literal. E.g. "/abc/g"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @returns The AST of the given regular expression.
     */
    parseLiteral(source: string, start?: number, end?: number): RegExpLiteral;
    /**
     * Parse a regular expression flags. E.g. "gim"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @returns The AST of the given flags.
     */
    parseFlags(source: string, start?: number, end?: number): Flags;
    /**
     * Parse a regular expression pattern. E.g. "abc"
     * @param source The source code to parse.
     * @param start The start index in the source code.
     * @param end The end index in the source code.
     * @param uFlag The flag to set unicode mode.
     * @returns The AST of the given pattern.
     */
    parsePattern(source: string, start?: number, end?: number, uFlag?: boolean): Pattern;
}
